import { type } from "os";

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
    reviews:Array<Review>;
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

export type Review = {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}