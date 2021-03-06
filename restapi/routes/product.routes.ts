import {Router}  from 'express';
const router:Router = Router();

import productController from './../controller/ProductController';
import reviewController from './../controller/ReviewController'
import authController from './../controller/AuthController';


router.get('/products', productController.getProducts);
router.post('/product', productController.saveProduct);
router.get('/products/:id', productController.getProductWithId); 
router.post('/review/add',reviewController.addReview);
router.get('/products/:id/images', productController.getProductImages);

router.delete('/product/:id', authController.verifyToken, productController.deleteProduct);


export default router;
