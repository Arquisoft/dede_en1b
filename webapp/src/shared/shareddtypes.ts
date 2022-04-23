export type User = {
  name: string;
  email: string;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  numImages: number;
  product: Product;
  quantity: number;
}

export type Order = {
  userId: string;
  products: Array<Product>;
  subTotal: number;
  deliveryPrice: number;
  createdAt: Date;
}

export type ItemCart = {
  product: Product
  quantity: number
}

export type Address = {
  street:string|null
  city:string|null
  state:string| null
  zip:string| null
  country:string| null
}