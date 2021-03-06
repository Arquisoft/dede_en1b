import { Request, Response } from 'express';
import Order from '../model/Order';
import Product from '../model/Product';
import Review,{ ReviewModel } from '../model/Review';
const ObjectId = require('mongodb').ObjectID;
class ReviewController {

    public async addReview(req: Request, res: Response) {
        const { userId, productId, orderId, rating, comment } = req.body;

        // Check Fields
        if (userId == null || userId.length == 0 || orderId == null || orderId.length == 0 || productId == null || productId.length == 0) {
            return res.status(400).send({
                message: 'Invalid parameters.'
            });
        }


        //find the order 
        const order = await Order.findOne({ _id: ObjectId(orderId), userId: userId.toString() });
        if (!order) 
            return res.status(404).json({ message: 'You cant review a product you didnt order' });

        //check that te user has not already reviewed the product

        if (order.products.find(product => product.productId === productId)?.reviewed) {
            return res.status(400).send({
                message: 'You have already reviewed this product'
            });
        }

        //create the review
        const review = new Review({ userId, productId, rating, comment });
        var product = await Product.findOne({_id:ObjectId(productId)});
        //set the productOrdered as reviewed
        order.products.find(product => product.productId === productId)!.reviewed = true;
        await Order.findOneAndUpdate({_id:ObjectId(orderId)},{products:order.products})
        //add the review to the product and save it
        product?.reviews.push(review as ReviewModel);
        product?.save().then(() => {
            res.status(200).json({
                message: 'Review added successfully'
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });


    }

}

export default new ReviewController();
