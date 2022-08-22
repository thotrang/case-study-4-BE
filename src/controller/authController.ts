import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { User } from "../model/user";
import { SECRET_KEY } from "../middleware/auth";
import { Role } from "../model/role";
import { Cart } from "../model/cart";

class AuthController {
    register = async (req: Request, res: Response) => {
        let user = req.body;
        user.avatar = 'https://upanh123.com/wp-content/uploads/2020/11/anh-tho-chibi.0.jpg'
        let checkName = await User.findOne({
            username: user.username
        })
        if (!checkName) {
            user.password = await bcrypt.hash(user.password, 10);
            let role = await Role.findOne({
                name: 'admin'
            })
            user.role = [role._id];
            user.status = 1;
            user = await User.create(user);
            let cart = await Cart.create({
                user: user._id
            })

            await Role.updateMany({ 'name': 'user' }, { $push: { users: user._id } });
            await User.findOneAndUpdate({
                _id: user._id,
            }, {
                $set: { cart: cart._id }
            });
            user = await User.findById(user._id).populate('cart', 'user');
            res.status(201).json(user);

        } else {
            res.status(401).json({
                message: 'Tên đăng nhập đã tồn tại'
            })
        }

    }


    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let loginForm = req.body;
            let user = await User.findOne({
                username: loginForm.username
            }).populate('role', 'name');
            if (!user) {
                res.status(401).json({
                    message: 'Username is not existed!'
                })
            } else {
                if (user.status == 1) {
                    let comparePassword = await bcrypt.compare(loginForm.password, user.password);
                    if (!comparePassword) {
                        res.status(401).json({
                            message: 'Password is wrong'
                        })
                    } else {
                        let payload = {
                            username: user.username,
                            role: user.role,
                            _id: user._id
                        }
                        let token = await jwt.sign(payload, SECRET_KEY, {
                            expiresIn: 36000
                        });
                        res.status(200).json({
                            token: token,
                            role: user.role,
                            id: user._id
                        });
                        next()
                    }
                } else {
                    res.status(401).json({
                        message: 'Account is locked'
                    })
                }

            }
        } catch (err) {
            next(err)
        }

    }

}
export default new AuthController();