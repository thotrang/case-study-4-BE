import {Store} from "../model/store";
import { Request, Response} from "express";

class StoreController {
    getAll = async (req: Request, res: Response) => {
        let stores = await Store.find();
        console.log(stores);
        res.status(200).json(stores);

    }
    addStore = async (req: Request, res: Response) => {
        let product = req.body;
        console.log(product)
        product = await Store.create(product);
        res.status(201).json(product);

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
            let product = await Store.findById(id);
            res.status(200).json(product);
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