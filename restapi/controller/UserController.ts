import { Request, Response } from 'express';
import User,{UserModel}  from '../model/User';
import mongoose from 'mongoose';




class UserController {

    
    
    public async saveUser( user:UserModel) {
        const userFound = User.findOne({email:user.email});
        if(userFound != null){
            throw new Error("User already exists");
        }
           
        user.save()
            .catch((error:any) => 
            {
                throw new Error(error.message);
            } );
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

