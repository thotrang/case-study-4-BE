// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import { User } from "../model/user";
// import {SECRET_KEY} from "../middleware/auth"
// class AuthController {
//     register = async (req: Request, res: Response) => {
//         let registerForm = req.body;
//         registerForm.passwourd = await bcrypt.hash(registerForm.passwourd,10)
//         let user = await User.create(registerForm);
//         res.status(201).json(user);
//     }
//     login = async (req: Request,res: Response) => {
//         let loginForm = req.body;
//         let user = await User.findOne({
//             username: loginForm.username
//         });
//         if(!user){
//             res.status(401).json({
//                 message: 'Username is not existed!'
//             })
//         }else{
//             let comparePassword = await bcrypt.compare(loginForm.passwourd,user.password);
//             if(!comparePassword){
//                 res.status(401).json({
//                     message:"Password is fales"
//                 })
//             }else{
//                 let payload = {
//                     username: user.username
//                 }
//                 let token = await jwt.sign(payload,SECRET_KEY,{
//                     expiresIn: 36000
//                 })
//                 res.status(201).json({
//                     token:token
//                 })
//             }
//         }
//     }
// }
// export default new AuthController();