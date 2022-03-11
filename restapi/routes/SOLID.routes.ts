import {Router}  from 'express';
import SOLIDController from '../controller/SOLIDController';
const router:Router = Router();


router.get('/login', SOLIDController.login);
router.get('/redirect-from-solid-idp', SOLIDController.redirect);
router.get('/fetch', SOLIDController.fetch);
router.get('/logout', SOLIDController.logout);


export default router;
