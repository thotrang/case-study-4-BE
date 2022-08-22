import { Product } from "../model/product";
import { Request, Response, NextFunction } from "express";
import { Category } from "../model/category";
import { Store } from "../model/store";

class ProductController {
    getAll = async (req: Request, res: Response) => {
        let product = await Product.find().populate('category', 'name');
        res.status(200).json(product);
    }
    addProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let product = req.body;
            console.log(product)
            product = await Product.create(product);
            let newProduct = await Product.findById(product._id).populate('category', 'name');
         
            await Category.updateMany({ _id: product.category }, { $push: { product: product._id } });
            await Store.updateMany({ _id: product.store }, { $push: { product: product._id } });
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    }

    deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        try {
            let product = await Product.findById(id);
            if (!product) {
                res.status(404).json();
            } else {
                product.delete();
                res.status(204).json();
            }
        } catch (error) {
            next(error);
        }
    }

    getProduct = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        try {
            let product = await Product.findById(id).populate('category').populate('store')

            if (!product) {
                res.status(404).json();
            } else {                
                res.status(200).json(product);
            }
        } catch (error) {
            next(error)
        }
    }

    updateProduct = async (req: Request, res: Response) => {
        let id = req.params.id;
        let product = await Product.findById(id);
        if (!product) {
            res.status(404).json();
        } else {
            let data = req.body;
            await Product.findOneAndUpdate({
                _id: id
            }, data);
            data._id = id;
            product = await Product.findById(id).populate('category', 'name');
            res.status(200).json(product);
        }
    }
}
export default new ProductController();