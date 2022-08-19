import {Category} from "../model/category";
import {Request, Response,NextFunction} from "express";

class CategoryController{
    getAll = async (req: Request, res: Response) => {
        let categories = await Category.find();
        res.status(200).json(categories);
    }
    addCategory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let category = req.body;
            category = await Category.create(category);
            res.status(201).json(category);
        }catch (error){
            next(error);
        }
    }

    deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        try {
            let category = await Category.findById(id);
            if (!category) {
                res.status(404).json();
            } else {
                category.delete();
                res.status(204).json();
            }
        } catch (error) {
            next(error);
        }
    }

    getCategory = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        try {
            let category = await Category.findById(id);
            if (!category) {
                res.status(404).json();
            } else {
                res.status(200).json(category);
            }
        } catch (error) {
            next(error)
        }
    }

    updateCategory = async (req: Request, res: Response) => {
        let id = req.params.id;
        let category = await Category.findById(id);
        if (!category) {
            res.status(404).json();
        } else {
            let data = req.body;
            await Category.findOneAndUpdate({
                _id: id
            }, data);
            data._id = id;
            res.status(200).json(data);
        }
    }
}
export default new CategoryController();