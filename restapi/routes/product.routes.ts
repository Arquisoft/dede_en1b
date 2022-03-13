import {Router}  from 'express';
const router:Router = Router();

import productController from './../controller/ProductController';


router.get('/products', productController.getProducts);
router.post('/product', productController.saveProduct);
router.get('/products/:id', productController.getProductByIdSebas);


export default router;
