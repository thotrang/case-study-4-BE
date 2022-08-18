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
            user.role = ["62fd161bfd34f0abdd2051d0"];
            user.status = 1;
            user = await User.create(user);
            await Role.updateMany({ '_id': user.role }, { $push: { users: user._id } });
            res.status(201).json(user);
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            let loginForm = req.body;
            let user = await User.findOne(loginForm);
                        
            if (!user) {
                res.status(401).json({
                    message: 'Username is not existed!'
                })
            } else {
                if (user.status != 1) {
                    res.status(401).json({
                        message: 'Your account is locked'
                    })
                } else {
                    let comparePassword = await bcrypt.compare(loginForm.passwourd, user.password);
                    if (!comparePassword) {
                        res.status(401).json({
                            message: "Password is fales"
                        })
                    } else {
                        let payload = {
                            username: user.username,
                            role: user.role
                        }
                        let token = await jwt.sign(payload, SECRET_KEY, {
                            expiresIn: 360000
                        })
                        res.status(201).json({
                            token: token                         
                        })
                    }
                }

            }
        } catch (err) {
            next(err)
        }

    }


}
export default new AuthController();