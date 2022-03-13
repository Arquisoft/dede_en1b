import {Router}  from 'express';
const router:Router = Router();

import userController from './../controller/UserController';
import authController from './../controller/AuthController';
import auth from './../middleware/auth';


router.get('/users',auth.verifyToken,userController.getUsers);
router.post('/register', authController.register);
router.post('/login', authController.login);  


export default router;
