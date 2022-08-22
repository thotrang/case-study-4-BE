import { Store } from "../model/store";
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {User} from "../model/user";
import {Role} from "../model/role";
import {Cart} from "../model/cart";
export const SECRET_KEY = "thotrang";
class StoreController {
    getAll = async (req: Request, res: Response) => {
        let stores = await Store.find().populate('product');
        res.status(200).json(stores);

    }
    addStore = async (req: Request, res: Response) => {
        let token;
        let authorization = req.headers.authorization;
        let accessToken = authorization.split(' ')[1];
        jwt.verify(accessToken, SECRET_KEY, (err, data) => {
            token=data
        })

        let store = req.body;
        store.user=token._id;
        console.log(store)
        store = await Store.create(store);
        res.status(201).json(store);

    }
    deleteStore = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        try {
            let store = await Store.findById(id);
            if (!store) {
                res.status(404).json();
            } else {
                await store.delete();
                await User.updateMany({ _id: store.user }, { $pull: { stores: store._id } });

                res.status(204).json();
            }
        } catch (error) {
            next(error);
        }
    }
    getStore = async (req: Request, res: Response) => {
        let id = req.params.id;
        try{
            // Store.findById(id).populate('user').populate('product').exec((err, data)=>{
            //     console.log(data);
            //     res.status(200).json(data);
            // });
            let store = await Store.findById(id).populate('user').populate('store')
            res.status(200).json(store)
        } catch(error){
            res.status(404).json(error.message)
        }


    }
    updateStore = async (req: Request, res: Response) => {
        let id = req.params.id;
        let store = await Store.findById(id);
        if (!store) {
            res.status(404).json();
        } else {
            let data = req.body;
            await Store.findOneAndUpdate({
                _id: id
            }, data);
            data._id = id;
            store = await Store.findById(id);
            res.status(200).json(store);
        }
    }
    searchStore = async (req: Request, res: Response)=>{
        let name = req.query.name;
        let store = await Store.find({ name: name });

        if (store[0]) {
            res.status(200).json(store);
        } else {
            res.status(404).json({
                message: "store not found"
            });

        }
    }

}

export default new StoreController();