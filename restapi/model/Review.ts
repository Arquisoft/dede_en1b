import moongose, { Schema,model } from 'mongoose';


const ReviewSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

export interface ReviewModel extends moongose.Document {
    userId: string;
    productId: string;
    rating: number;
    comment: string;
}

export default  model<ReviewModel>('Review', ReviewSchema);