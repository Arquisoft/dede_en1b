import { Request, Response } from 'express';
import User  from '../model/User';
import mongoose from 'mongoose';


class UserController {
    
    public saveUser(req: Request, res: Response) {
        const userFound = User.findOne({email:req.body.email});
        if(userFound != null){
            res.status(400).json({message:"User already exists"});
            return;
        }
        
        const { email, name, lastName, password, PODUrl } = req.body;
        const user = new User({email, name, lastName, password, PODUrl});
    
        user.save()
            .then(() => res.status(201).json({ message: 'User saved' }))
            .catch(error => res.status(400).json({ error }));
        }
    
    public async getUsers(req: Request, res: Response) {
        var users = await User.find({});
        res.send(users);
    }


    public async getUserByEmail(req: Request, res: Response) {
        const email=req.params.email;
        var user = await User.findOne({email:email});
        res.send(user);
    }
}

export default new UserController();

