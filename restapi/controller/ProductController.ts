import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../model/Product';


class ProductController {


    public saveProduct(req: Request, res: Response) {
        const { name, description, price, image, category } = req.body;
        const product
         = new Product({name, description, price, image, category});
        product.save()
            .then(() => res.status(201).json({ message: 'Product saved' }))
            .catch(error => res.status(400).json({ error }));
    }

    public async getProducts(req: Request, res: Response) {
        var products = await Product.find({});
        res.send(products);
    }

    public async getProductsByIds(ids: string[]) {
        var products = await Product.find({_id: {$in: ids}});
        return products;
    }

    public async getProductById(id: string) {
        var product  = await Product.findOne({_id: id});
        return product;
    }


}

const productController = new ProductController();
export  default productController;  