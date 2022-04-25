import {Router}  from 'express';
const router:Router = Router();

import productController from './../controller/ProductController';
import authController from './../controller/AuthController';


router.get('/products',productController.getProducts);
router.post('/product', authController.verifyToken, productController.saveProduct);
router.get('/products/:id', productController.getProductWithId); //neeeds refactoring, in group. There's already a 
                                                    // getProductById that is used somewhere else, for another purpose I believe. It
                                                    //does not control any route. 
router.get('/products/:id/images', productController.getProductImages);

router.delete('/product/:id', authController.verifyToken, productController.deleteProduct);


export default router;
