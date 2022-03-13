import {Router}  from 'express';
const router:Router = Router();

import productController from './../controller/ProductController';


router.get('/products', productController.getProducts);
router.post('/product', productController.saveProduct);
router.get('/products/:id', productController.getProductWithId); //neeeds refactoring, in group. There's already a 
                                                    // getProductById that is used somewhere else, for another purpose I believe. It
                                                    //does not control any route. 


export default router;
