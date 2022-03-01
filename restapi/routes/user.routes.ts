import {Router}  from 'express';
const router:Router = Router();

import userController from './../controller/UserController';


router.get('/users', userController.getUsers);
router.post('/user', userController.saveUser);


export default router;
