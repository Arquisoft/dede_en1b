import {Router}  from 'express';
const router:Router = Router();

import orderController from './../controller/OrderController';


router.get('/orders',orderController.getOrders); 
router.post('/order', orderController.saveOrder);
router.post('/order/find', orderController.getOrderByUserId);

export default router;

