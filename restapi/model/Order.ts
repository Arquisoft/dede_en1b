import moongose, { Schema,model } from 'mongoose';
import { ProductOrdered } from './ProductOrdered';

const OrderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    //a list of products
    products: {
        type: Array,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    deliveryPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

export interface Order extends moongose.Document {
    userId: string;
    products: Array<ProductOrdered>;
    subTotal: number;
    deliveryPrice: number;
}

export default model<Order>('Order', OrderSchema);


