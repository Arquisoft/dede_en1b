import {ProductModel} from "./Product";

export interface ProductOrdered {
    productId: string;
    product : ProductModel;
    quantity : number;
    price : number;
    reviewed : boolean;
}