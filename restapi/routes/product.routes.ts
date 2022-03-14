import {Router}  from 'express';
const router:Router = Router();

import productController from './../controller/ProductController';


router.get('/products', productController.getProducts);
router.post('/product', productController.saveProduct);


export default router;
