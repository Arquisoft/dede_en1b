import {Router}  from 'express';
const router:Router = Router();

import orderController from './../controller/OrderController';


router.get('/orders',orderController.getOrders); 
router.post('/order', orderController.saveOrder);

export default router;

