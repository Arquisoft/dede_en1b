import {User,Product, ItemCart} from '../shared/shareddtypes';

export async function addUser(user:User):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':user.name, 'email':user.email})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getUsers():Promise<User[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

export async function getProducts():Promise<Product[]>{ 
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  console.log(apiEndPoint+'/products')
  let response = await fetch(apiEndPoint+'/products');
  return response.json();
}

export async function getCart() {
  var cart = localStorage.getItem('cart');
  if(cart != null)
    return JSON.parse(cart);
  else{
    localStorage.setItem('cart', JSON.stringify([]));
    return [];
  }
    
}

export async function addToCart(itemCart:ItemCart) {
  var cart = await getCart();
  const index = cart.findIndex((i:ItemCart)=>i.product.id===itemCart.product.id);
  if(index>=0){
    itemCart.quantity += cart[index].quantity;
    cart[index] = itemCart;
    }
  else
    cart.push(itemCart);
  localStorage.setItem('cart', JSON.stringify(cart));
}

export async function deleteFromCart(itemCart:ItemCart) {
  var cart = await getCart();
  const index = cart.findIndex((i:ItemCart)=>i.product.id===itemCart.product.id);
  if(index>=0){
    delete cart[index];
    cart = cart.filter(Boolean);
  }
  else {
    return false;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}
  



export async function getProductById(id: any):Promise<Product>{ 
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  console.log(apiEndPoint+'/product/id')
  let response = await fetch(apiEndPoint+'/products/' + id);
  return response.json();
}

  
