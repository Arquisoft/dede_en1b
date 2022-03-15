import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../model/Order';
import  { Product } from '../model/Product';
import { ProductOrdered } from '../model/ProductOrdered';
import productController from './ProductController';


class OrderController {

    public async saveOrder(req: Request, res: Response) {
        const { userId, products} = req.body;
        await Promise.all(products.map(async (productOrdered:ProductOrdered) => {
            const p =  await productController.getProductById(productOrdered.productId) as Product;
            productOrdered.product = p;
            console.log(productOrdered);
            console.log(p);
            productOrdered.price = p.price;
        }));

        const subTotal = products.reduce((acc:number, productOrdered:ProductOrdered) => acc + productOrdered.price * productOrdered.quantity, 0);
        console.log("esto deberia ser lo ultimo" ,products)
        const order = new Order( {userId, products, subTotal,deliveryPrice:0} );
        order.save()
            .then(() => res.status(201).json({ message: 'Order saved' }))
            .catch(error => res.status(400).json({ error }));
    }

    public async getOrders(req: Request, res: Response) {
        var orders = await Order.find({});
        res.send(orders);
    }

    public async getOrderByUserId(req: Request, res: Response) {
        const userId = req.params.userId;
        var order = await Order.find({ userId: userId });
        res.send(order);
    }
}

export default new OrderController();