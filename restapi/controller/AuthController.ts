import { NextFunction, Request, Response } from 'express';
import UserController from './UserController';
import UserModel from '../model/User';
import { verify } from 'crypto';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

   

    module.exports = {

    
    register: async (req: Request, res: Response) => {

        if(req.body.password === undefined || req.body.email === undefined)
            res.status(400).send({ message: 'Please provide email and password' });
        //check if email already exists
        const userFound = await UserModel.findOne({email:req.body.email.toString()});
        if(userFound){
            res.status(400).send({ message: 'User already exists' });
            return
        }
        
        const password = await bcrypt.hash(req.body.password,10 );

        console.log(await bcrypt.compare(req.body.password, password));

        const email = req.body.email;
        const user = new UserModel({email,  password});

        try {
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    
    },


    login: async(req: Request, res: Response) => {
        const { email, password } = req.body;
        var userEmail = String(email);
    
        const user = await UserModel.findOne({email:userEmail});
        if(!user) {
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({
            name: user.email,
            id: user._id
        }, process.env.TOKEN_SECRET)

        res.send(token);
    },

    verifyToken: async(req: Request, res: Response, next:NextFunction) => {
        let token = req.headers['auth-token'];
        if(!token)
            return res.status(401).send({message: 'Unauthorized'});

        jwt.verify(token, process.env.TOKEN_SECRET, async (err:any, decoded:any) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        });
    }
}

export default module.exports;

