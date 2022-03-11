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

ProductSchema.method('toClient', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});
// Ensure virtual fields are serialised.
ProductSchema.set('toJSON', {
    virtuals: true
});

export default model<Product>('Product', ProductSchema);