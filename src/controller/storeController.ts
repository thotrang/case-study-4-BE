import {Store} from "../model/store";
import { Request, Response} from "express";

class StoreController {
    getAll = async (req: Request, res: Response) => {
        let stores = await Store.find().populate('product');
        res.status(200).json(stores);

    }
    addStore = async (req: Request, res: Response) => {
        // let id =    

    }
    deleteStore = async (req: Request, res: Response) => {
        let id = req.params.id;
        let product = await Store.findById(id);
        if (!product) {
            res.status(404).json();

        } else {
            product.delete();
            res.status(204).json();
        }
    }
    getStore = async (req: Request, res: Response) => {
        let id = req.params.id;
        try{
            // Store.findById(id).populate('user').populate('product').exec((err, data)=>{
            //     console.log(data);
            //     res.status(200).json(data);
            // });
            let store = await Store.findById(id).populate('user').populate('product')
            res.status(200).json(store)
        } catch(error){
            res.status(404).json(error.message)
        }


    }
    updateStore = async (req: Request, res: Response) => {
        let id = req.params.id;
        let product = await Store.findById(id);
        if (!product) {
            res.status(404).json();
        } else {
            let data = req.body;
            await Store.findOneAndUpdate({
                _id: id
            }, data);
            data._id = id;
            product = await Store.findById(id);
            res.status(200).json(product);
        }
    }
    searchStore = async (req: Request, res: Response)=>{
        let name = req.query.name;
        let product= await Store.find({name: name});

        if (product[0]) {
            res.status(200).json(product);
        } else {
            res.status(404).json({
                message:"product not found"
            });

        }
    }

}

export default new StoreController();