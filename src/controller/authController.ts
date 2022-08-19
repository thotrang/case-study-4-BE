import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { User } from "../model/user";
import { SECRET_KEY } from "../middleware/auth";
import { Role } from "../model/role";
class AuthController {
    register = async (req: Request, res: Response) => {
        let user = req.body;
        if (user.password != user.rePassword) {
            res.status(500).json({
                message: 'Re-password fales'
            })
        } else {
            user.password = await bcrypt.hash(user.password, 10);
            let role =await Role.findOne({
                name:'user'
            })
            user.role = [role._id];
            console.log(user.role);
            
            user.status = 1;
            user = await User.create(user);
            await Role.updateMany({ '_id': user.role }, { $push: { users: user._id } });
            res.status(201).json(user);
        }
    }

   
    login = async (req: Request, res: Response, next: NextFunction) => {
        try{
            let loginForm = req.body;
            let user = await User.findOne({
                username: loginForm.username
            }).populate('role', 'name');
            if (!user) {
                res.status(401).json({
                    message: 'Username is not existed!'
                })
            } else {
                let comparePassword = await bcrypt.compare(loginForm.password, user.password);
                if (!comparePassword) {
                    res.status(401).json({
                        message: 'Password is wrong'
                    })
                } else {
                    let payload = {
                        username: user.username,
                        role: user.role
                    }
                    let token = await jwt.sign(payload, SECRET_KEY, {
                        expiresIn: 36000
                    });
                    res.status(200).json({
                        token: token,
                        role: user.role
                    });
                    next()
                }
            }
        }catch(err){
            next(err)
        }
        
    }

}
export default new AuthController();