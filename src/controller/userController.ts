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
    getseller = async (req: Request, res: Response, next: NextFunction) => {
        let user = await User.find({
            role: Role.findOne({
                name: 'seller'
            })
        }).populate('role', 'name');
        res.status(200).json(user);
    }
    // lockUser = async (req: Request, res: Response) => {
    //     let id = req.params.id;
    //     let user = await User.findById(id).populate('role', 'name');
    //     if (!user) {
    //         res.status(404).json();
    //     } else {
    //         if (user.status === 1) {
    //             user.status = 0
    //         } else {
    //             user.status = 1
    //         }
    //         await Role.updateMany({ _id: user.role }, { $pull: { users: user._id } });
    //         await Role.updateMany({ _id: user.role }, { $push: { users: user._id } });
    //         res.status(200).json(user);
    //     }
    // }
    lockUser = async (req: Request, res: Response) => {
        let id = req.params.id;
        let user = await User.findById(id);
        if (!user) {
            res.status(404).json();
        } else {
            if (user.status === 1) {
                await User.findOneAndUpdate({
                    _id: id
                }, { $set: {status: 0} });
            } else {
                await User.findOneAndUpdate({
                    _id: id
                }, { $set: {status: 1} });
            }
            await Role.updateMany({ _id: user.role }, { $pull: { users: user._id } });
            await Role.updateMany({ _id: user.role }, { $push: { users: user._id } });

            user = await User.findById(id).populate('role', 'name');
            res.status(200).json(user);
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        try {
            let user = await User.findById(id);
            if (!user) {
                res.status(404).json();
            } else {
                await user.delete();
                await Role.updateMany({ _id: user.role }, { $pull: { users: user._id } });
                console.log(user.role);

                res.status(204).json();
            }
        } catch (error) {
            next(error);
        }
    }
    uppdateUser = async (req: Request, res: Response) => {
        let id = req.params.id;
        let user = await User.findById(id).populate('role', 'name');
        if (!user) {
            res.status(404).json();
        } else {
            let data = req.body;
            await User.findOneAndUpdate({
                _id: id
            }, data);
            await Role.updateMany({ _id: user.role }, { $pull: { users: user._id } });
            await Role.updateMany({ _id: user.role }, { $push: { users: user._id } });

            user = await User.findById(id).populate('role', 'name');
            res.status(200).json(user);
        }
    }
}
export default new UserController();