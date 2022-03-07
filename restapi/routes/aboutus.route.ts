import {Router}  from 'express';
const router:Router = Router();


router.get('/about_us', orderController.getOrders);

export default router;

