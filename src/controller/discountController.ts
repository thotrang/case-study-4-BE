import {NextFunction, Response, Request} from 'express'
import {Discount} from "../model/discount";

class DiscountController {
    getAll = async (req: Request, res: Response, next : NextFunction) => {
        let discount = Discount.find()
        res.status(200).json(discount)
    }
    addDiscount = async (req: Request, res: Response, next :NextFunction) =>{
        try {
            let discount = req.body
            discount = await Discount.create(discount)
            res.status(200).json(discount)
        }catch(err) {
            next(err)
        }
    }
    deleteDiscount = async (req: Request, res: Response, next : NextFunction) =>{
        let id = req.params.id
        try {
            let discount = await Discount.findById(id)
            if(!discount) {
                res.status(404).json()
            }else {
                discount.delete()
                res.status(200).json()
            }

        }catch (err) {
            next(err)
        }
    }
}

export default new DiscountController()