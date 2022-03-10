import {Product} from "./Product";

export interface ProductOrdered {
    productId: string;
    product : Product;
    quantity : number;
    price : number;
}