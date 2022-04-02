import { Request, Response } from 'express';
import Product from '../model/Product';
import Review,{ ReviewModel } from '../model/Review';

class ReviewController {

    public async addReview(req: Request, res: Response) {
        const { userId, productId, rating, comment } = req.body;
        //TODO: Check the user is logged in and has bought the product

        //check that te user has not already reviewed the product
        const productFound = await Product.findById(productId);
        const reviewFound = productFound?.reviews.find(review => review.userId === userId);
        
        console.log(reviewFound);
        if(reviewFound) {
            return res.status(400).send({
                message: 'You have already reviewed this product'
            });
        }

        const review = new Review({ userId, productId, rating, comment });
        var product = await Product.findOne({_id:productId});
        product?.reviews.push(review as ReviewModel);
        product?.save().then(()=>{
            res.status(200).json({
                message: 'Review added successfully'
            });
        }).catch(err=>{
            res.status(500).json({
                error: err
            });
        });


    }
}

export default new ReviewController();
