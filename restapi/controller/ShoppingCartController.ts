import { Request, Response } from 'express';
import {ShoppingCart} from '../model/ShoppingCart';
import productController from './ProductController';
import {ProductOrdered} from './../model/ProductOrdered';


const cart: ShoppingCart = {userId: "", products: []}; 
class ShoppingCartController {


    public async getCart(req: Request, res: Response) {
        res.send(cart);
    }

    public async addToCart(req: Request, res: Response) {
        const { productId, quantity } = req.body;
        var product = await productController.getProductById(productId);
        if(product == null){
            res.status(400).json({message:"Product not found"});
            return;
        }
        var productOrdered : ProductOrdered = {
            productId: productId,
            product: product,
            quantity: quantity,
            price: product.price
        };
        cart.products.push(productOrdered);
        res.send(cart);
    }

}

export default new ShoppingCartController();