import {NextFunction, Request, Response} from 'express'

import {Item} from "../model/item";
import {Cart} from "../model/cart";

export class ItemController {
    getALlItemInCart = async (req: Request, res: Response, next: NextFunction) => {
        let userId = req.query.user_id;
        let cart = await Cart.findOne({
            user: {
                _id: userId,
                status: 0
            }
        })
        let items = await Item.find({
            cart: {
                _id: cart._id
            }
        }).populate('product', ['name', 'price'])
        res.status(200).json(items)
    }

}
export default new ItemController();