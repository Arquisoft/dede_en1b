import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../model/Order';
import  { ProductModel } from '../model/Product';
import { ProductOrdered } from '../model/ProductOrdered';
import productController from './ProductController';


class OrderController {

    public async saveOrder(req: Request, res: Response) {
        const { userId, products,deliveryPrice} = req.body;
        console.log("products",products);
        var errmsg = "Order cannot be saved";   // End case

        await Promise.all( products.map(async (productOrdered:ProductOrdered) => {
            console.log("productOrdered",productOrdered);
            const p =  await productController.getProductById(productOrdered.productId) as ProductModel;
            productOrdered.product = p;
            console.log("product", p);
            productOrdered.price = p.price;
        }))
        .catch(err => errmsg = "Wrong order values");

        const subTotal = products.reduce((acc:number, productOrdered:ProductOrdered) => acc + productOrdered.price * productOrdered.quantity, 0);
        console.log("esto deberia ser lo ultimo" ,products)
        const order = new Order( {userId, products, subTotal,deliveryPrice:deliveryPrice} );
        console.log("order",order);
        order.save()
            .then(() => res.status(201).json({ message: 'Order saved' }))
            .catch(error => res.status(400).json({ error, message: errmsg }));
    }

    public async getOrders(req: Request, res: Response) {
        var orders = await Order.find({});
        res.send(orders);
    }

    public async getOrderByUserId(req: Request, res: Response) {
        const userId = req.body.webId;
        console.log("userId",req.body);
        var order = await Order.find({ userId: userId });
        res.send(order);
    }
}

export default new OrderController();