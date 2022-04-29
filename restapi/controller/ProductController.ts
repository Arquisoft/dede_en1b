import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../model/Product';
import { v4 as uuidv4 } from 'uuid';

const path = require('path');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectID;
const qs = require('qs');






class ProductController {


    public saveProduct(req: Request, res: Response) {
        const { name, description, price, category,base64Images } = req.body;
        if (!name || !description || !price || !category || !base64Images) {
            res.status(400).send({ message: 'Please provide all the required fields' });
            return;
        }
        let imagePath = uuidv4();
        

        new ProductController().saveImages(base64Images, imagePath);
        const product
         = new Product({name, description, price,image:imagePath, category});
        product.save()
            .then(() => res.status(201).json({ message: 'Product saved' }))
            .catch((error:any) => res.status(400).json({ error }));
    }

    private saveImages(base64Images: string[], image: string) {
        base64Images.forEach(async (base64Image: string) => {
            base64Image= base64Image.replace(/^data:image\/png;base64,/, "");
            const imageBuffer = Buffer.from(base64Image, 'base64');
            //create folder if not exist
            if (!fs.existsSync(path.join(__dirname, "../public/cars/"+image))) {
                fs.mkdirSync(path.join(__dirname, "../public/cars/"+image));
            }
            fs.writeFileSync(path.join(__dirname, "../public/cars/"+image+"/"+ uuidv4()+".jpg"), imageBuffer,"base64");
        });
    }

    public async getProducts(req: Request, res: Response) {
        let rating = 0;

        let userQuery = qs.parse(req.query);
        let query:any = {};
        for(let key in userQuery){
            if (typeof userQuery[key] === "string"){
                userQuery[key] = {eq: userQuery[key]};
            }
            query[key] = {}
            for (let i = 0; i < Object.keys(userQuery[key]).length; i++) {
                console.log(query[key]);
                Object.assign(query[key], buildQuery(key,Object.keys(userQuery[key])[i], Object.values(userQuery[key])[i] as string));
            }
        }
        console.log("Searching products using ", query);
        const products = await Product.find(query);
        if(rating > 0){
            res.status(200).json(products.filter(product => product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length >= rating));
            return;
        }
        res.status(200).json(products);

            
        function  buildQuery(field:string,comparator:string, value:string):any{
            let query:any = {};
    
            if(field == "rating"){
                rating = parseInt(value);
            }
            if(["name","description","color","category","brand"].includes(field)){
                return {$regex: value, $options: 'i'};
            }
            switch(comparator){
                case "gte":
                    return {$gte: value};
                case "lte":
                    return {$lte: value};
                case "eq":
                    return {$eq: value};
                default:
                    return {}
            }
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


    public async deleteProduct(req: Request, res: Response) {
        try{
            const product  = await Product.findOne({_id: ObjectId(req.params.id)});
            if (product) {
                await Product.deleteOne({_id: ObjectId(req.params.id)});
                res.status(200).json({ message: 'Product deleted' });
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
