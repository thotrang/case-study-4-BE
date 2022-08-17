import { Role } from "../model/role";
import { User } from "../model/user";
import { NextFunction, Request, Response } from "express";



class UserController {
    getAll = async (req: Request, res: Response) => {
        let user = await User.find().populate('role', 'name');
        res.status(200).json(user);
    }
    getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = req.params.id;
            let user = await User.findById(id).populate('role', 'name');
            if (!user) {
                res.status(404).json();
            } else {
                res.status(200).json(user);
            }
        } catch (err) {
            next(err)
        }
    }
    getUserWithRole = async (req: Request, res: Response) => {
        let id = req.params.id;
        let role = await Role.findById(id).populate('role', 'name');
        if (!role) {
            res.status(404).json();
        } else {
            let listUser = await role.users;
            res.status(200).json(listUser);
        }
    }
    lockUser = async (req: Request, res: Response) => {
        let id = req.params.id;
            let user = await User.findById(id).populate('role', 'name');
            if (!user) {
                res.status(404).json();
            } else {
                if(user.status === 1){
                    user.status = 0
                }else{
                    user.status = 1
                }
            }
    }
    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        try {
            let user = await User.findById(id);
            if (!user) {
                res.status(404).json();
            } else {
                user.delete();
                res.status(204).json();
            }
        } catch (error) {
            next(error);
        }
    }
    uppdateUser = async (req: Request, res: Response) => {
        let id = req.params.id;
        let user = await User.findById(id);
        if (!user) {
            res.status(404).json();
        } else {
            let data = req.body;
            await User.findOneAndUpdate({
                _id: id
            }, data);
            data._id = id;
            user = await User.findById(id).populate('role','name');
            res.status(200).json(user);
        }
    } 
}
export default new UserController();