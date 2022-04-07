import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../model/Product';
const path = require('path');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectID;



class ProductController {


    public saveProduct(req: Request, res: Response) {
        const { name, description, price, image, category } = req.body;
        const product
         = new Product({name, description, price, image, category});
        product.save()
            .then(() => res.status(201).json({ message: 'Product saved' }))
            .catch((error:any) => res.status(400).json({ error }));
    }

    public async getProducts(req: Request, res: Response) {
        let params = req.query.search;
        if(params){
            const products = await Product.find({name: {$regex: params, $options: 'i'}});
            res.status(200).json(products);
        }
        else{
            var products = await Product.find({});
            //products = await productController.addImagePaths(products);
            res.send(products);
        }
            
    }

    public async getProductsByIds(ids: string[]) {
        var products = await Product.find({_id: {$in: ids}});
        return products;
    }

    public async getProductById(id: string) { ///this GetProductById should be changed? I think we should use the one below.
        var product  = await Product.findOne({_id: id});
        return product;
    }

    public async getProductImages(req:Request, res:Response): Promise<void> {
        if(req.params.id === undefined)
            res.status(404).send({ message: 'Product Not Found' });
        
        let product = await Product.findOne({_id: ObjectId(req.params.id)});
        if (!product)
            res.status(404).send({ message: 'Product Not Found' });

        let images:string[] = [];
        try{
            fs.readdirSync(path.join(__dirname, "../public/cars/"+product?.image)).forEach((file :File)=> {
                images.push("/cars/"+product?.image+"/"+file);
            });
        }catch(e){
            res.send([]);
            return;
        }
        res.send(images);
    }


    public async getProductWithId(req: Request, res: Response) {
        try{
            const product  = await Product.findOne({_id: ObjectId(req.params.id)});
            if (product) {
                res.status(200).json(product);
                console.log(product);
            }else {
                res.status(404).send({ message: 'Product Not Found' });
            }
        }catch(e){
            res.status(404).send({ message: 'Product Not Found' });
        }
        
 
    }
}

const productController = new ProductController();
export  default productController;  
