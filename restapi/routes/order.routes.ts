import {Router}  from 'express';
const router:Router = Router();

import orderController from './../controller/OrderController';
import authController from './../controller/AuthController';

router.get('/orders',authController.verifyToken ,orderController.getOrders); 
router.post('/order', orderController.saveOrder);
router.post('/order/find', orderController.getOrderByUserId);

export default router;

