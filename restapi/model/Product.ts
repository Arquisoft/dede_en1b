import moongose, { Schema,model } from 'mongoose';

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    description: {
        type: String,
        required: true
    },

},  {
    timestamps: true
});

export interface Product extends moongose.Document {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export default model<Product>('Product', ProductSchema);