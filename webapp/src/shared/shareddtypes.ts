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
  reviews: Array<Review>;
  numImages: number;
  product: Product;
  _id: string;
  quantity: number;
}

export type Order = {
  userId: string;
  products: Array<ProductOrdered>;
  subTotal: number;
  deliveryPrice: number;
  createdAt: Date;
  address: string;
  id: string;
}

export type ItemCart = {
  product: Product
  quantity: number
}

export type Review = {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  orderId: string;
}

export type ProductOrdered = {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  reviewed: boolean;
}
export type Address = {
  street: string | null
  city: string | null
  state: string | null
  zip: string | null
  country: string | null
}