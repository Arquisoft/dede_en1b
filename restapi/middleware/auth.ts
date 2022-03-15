import { NextFunction } from "express";
import { Request, Response } from 'express';
import { UserModel } from "./../model/User";



const jwt = require('jsonwebtoken')

declare global {
    namespace Express {
        export interface Request {
            user: UserModel;
        }
    }
}


class Auth{

    public async verifyToken(req:Request, res:Response, next:NextFunction){
        const token = req.header('auth-token');
        if(!token) return res.status(401).send('Access denied. No token provided.');
        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;    
            next();
        }catch(err){
            res.status(400).send('Invalid token.');
        }
    }
}

export default new Auth();