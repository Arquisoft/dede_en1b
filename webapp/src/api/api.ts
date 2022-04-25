import { User, Product, Order,ItemCart } from '../shared/shareddtypes';



//if the current url is www.dedeen1b.tk sets the apiEndPoint to api.dedeen1b.tk
export const baseApiEndPoint = window.location.href.includes("www.dedeen1b.tk") ? "https://api.dedeen1b.tk" : (process.env.REACT_APP_API_URI || 'http://localhost:5000');
export const apiEndPoint = baseApiEndPoint + "/api"




export async function addUser(user: User): Promise<boolean> {
  let response = await fetch(apiEndPoint + '/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'name': user.name, 'email': user.email })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function getUsers(): Promise<User[]> {
  const apiEndPoint = window.location.href.includes("www.dedeen1b.tk") ? "https://api.dedeen1b.tk/api" : (process.env.REACT_APP_API_URI || 'http://localhost:5000/api');
  let response = await fetch(apiEndPoint + '/users/list');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}

export async function getProducts(searchParams?:String): Promise<Product[]> {
  let response = await fetch(apiEndPoint + '/products' + (searchParams ? '?search=' + searchParams : ''));
  return response.json();
}

export async function getOrderByUserId(webId: string): Promise<Order[]> {
  const apiEndPoint = window.location.href.includes("www.dedeen1b.tk") ? "https://api.dedeen1b.tk/api" : (process.env.REACT_APP_API_URI || 'http://localhost:5000/api');
  let response = await fetch(apiEndPoint + '/order/find' ,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'webId': webId })
  });
  return response.json();
}

export  function getCart() : ItemCart[] {
  var cart = localStorage.getItem('cart');
  if(cart != null)
    return JSON.parse(cart);
  else{
    localStorage.setItem('cart', JSON.stringify([]));
    return [];
  }
    
}


export function getShippingCost(country?:String|null, locality?:String|null){
  var cart = getCart();
  var totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  var shippingCost;  
  
  if(country === "Spain" && locality !== "Ceuta" && locality !== "Melilla" && locality !== "Baleares"
                  && locality !== "Canarias")
  {
    shippingCost = 3.99;
  }else 
  {
    shippingCost = 7.50 ;
  }

  if(country !== "Spain")
  {
    shippingCost = 30;
  }
  
  if(totalPrice > 100){
    shippingCost = 0;
  }

  return shippingCost;
}


export  function addToCart(itemCart:ItemCart, factor:number=1) : void {
  var cart = getCart();
  console.log(cart);
  const index = cart.findIndex((i:ItemCart)=>i.product.id===itemCart.product.id);
  if(index>=0){
    cart[index].quantity += factor;
    }
  else
    cart.push(itemCart);
  localStorage.setItem('cart', JSON.stringify(cart));
}

export async function deleteFromCart(id:String) {
  var cart = getCart();
  const index = cart.findIndex((i:ItemCart)=>i.product.id===id);
  if(index>=0){
    delete cart[index];
    cart = cart.filter(Boolean);
  }
  else {
    return false;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function emptyCart(updateCarCountNumberFunction:Function) {
  localStorage.setItem('cart', JSON.stringify([]));
  updateCarCountNumberFunction();
}


export async function getProductById(id: any):Promise<Product|undefined>{ 
  const apiEndPoint = window.location.href.includes("www.dedeen1b.tk") ? "https://api.dedeen1b.tk/api" : (process.env.REACT_APP_API_URI || 'http://localhost:5000/api');
  console.log(apiEndPoint+'/product/id')
  let response = await fetch(apiEndPoint+'/products/' + id);
  if(response.status === 200)
    return response.json();
  else
    return undefined;
}

export async function getProductImages(id: string):Promise<string[]>{ 
  console.log(apiEndPoint+'/product/' + id + '/images');
  let response = await fetch(apiEndPoint+'/products/' + id + '/images');
  return response.json();
}

export async function addOrderToUser(webId: string) {
  console.log('adding order to user ' + webId)
  var shippingCost = getShippingCost(localStorage.getItem("country"), localStorage.getItem("locality"));
  const apiEndPoint = window.location.href.includes("www.dedeen1b.tk") ? "https://api.dedeen1b.tk/api" : (process.env.REACT_APP_API_URI || 'http://localhost:5000/api');
  let response = await fetch(apiEndPoint + '/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'userId': webId,'deliveryPrice': shippingCost,'products': 
      getCart().map( (item:ItemCart) => {
        let pid = item.product.id;
        var product = {
          'productId': pid,
          'product': null,
          'quantity': item.quantity,
          'price': item.product.price
        }
        return product;
      })
    })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}


export async function adminLogin(email: string, password: string): Promise<boolean> {
  let response = await fetch(apiEndPoint + '/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'email': email, 'password': password })
  });
  if (response.status === 200){
    localStorage.setItem('token', await response.text());
    return true;
  }
  else
    return false;
}

function imgToBase64(img:any): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(img);
  });
}

export async function addProduct(product: Product,images:FileList) {
  //convert images to base64
  var base64Images: (string|any)[] = [];
  for(var i = 0; i < images.length; i++)
  {
    base64Images.push(await imgToBase64(images[i]));     
  }
  let bodyObject:any = product;
  bodyObject.base64Images = base64Images;

  let response = await fetch(apiEndPoint + '/product', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyObject)
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function  getOrders(): Promise<Order[]> {
  const apiEndPoint = window.location.href.includes("www.dedeen1b.tk") ? "https://api.dedeen1b.tk/api" : (process.env.REACT_APP_API_URI || 'http://localhost:5000/api');
  let response = await fetch(apiEndPoint + '/orders', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') as string   },
    
  });
  return response.json();
}

  
