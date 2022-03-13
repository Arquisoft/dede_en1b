import {Router}  from 'express';
const router:Router = Router();

import orderController from './../controller/OrderController';


router.get('/orders', orderController.getOrders);
router.post('/order', orderController.saveOrder);
router.get('/order/:userId', orderController.getOrderByUserId);

export default router;

