import {NextFunction, Request, Response} from 'express'

import {Item} from "../model/item";

export class ItemController {
    getALl = async (req: Request, res: Response, next: NextFunction) => {
        let item = await Item.find().populate('product', ['name', 'price'])
        res.status(200).json(item)
    }
    addItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let add = req.body
            add = await Item.create(add)
            res.status(200).json(add)
        } catch (err) {
            next(err)
        }
    }
    updateItem = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id
        try {
            let item = await Item.findById(id)
            if (!item) {
                res.status(404).json()
            } else {
                let data = req.body
                await Item.findOneAndUpdate({
                    _id: id
                }, data)
                data._id = id
                res.status(200).json(data)
            }
        } catch (err) {
            next(err)
        }
    }
    deleteItem = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id
        try {
            let item = await Item.findById(id)
            if (!item) {
                res.status(404).json()
            } else {
                res.status(200).json()
            }
        } catch (err) {
            next(err)
        }
    }
}

export default new ItemController()
