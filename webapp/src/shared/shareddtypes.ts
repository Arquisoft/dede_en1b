export type User = {
    name:string;
    email:string;
  }

export type Product = {
    id:string;
    name:string;
    description:string;
    price:number;
    image:string;
    category:string;
}

export type Order = {
  userId: string;
    products: Array<Product>;
    subTotal: number;
    deliveryPrice: number;
}

export type ItemCart = {
  product:Product
  quantity: number
}