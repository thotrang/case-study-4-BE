import {Request, Response} from "express";
import {Cart} from "../model/cart";
import {Item} from "../model/item";


class CartController {

    addToCart = async (req: Request, res: Response) => {
        let userId = req.query.user_id;
        let item = req.body;
        //Status 0 là chưa kết thúc đơn hàng - 1 là đơn hàng hoàn thành
        let currentCart = await Cart.findOne({
            user: {
                _id: userId
            },
            status: 0
        })

        if (currentCart) {
            let items = await Item.find({
                cart: {
                    _id: currentCart._id
                }
            });
            for (let i = 0; i < items.length; i++) {
                if (items[i].product.name == item.product.name) {
                    items[i].amount++;
                    item = items[i];
                    await Item.findOneAndUpdate({
                        _id: item._id
                    }, item);
                }
            }
            item.cart = {
                _id: currentCart._id
            }
            await Item.create(item);
            res.status(201).json(currentCart)
        } else {
            let cart = await Cart.create({
                user: {
                    _id: userId,
                },
                status: 0
            });
            item.cart = {
                _id: cart._id
            }
            await Item.create(item);
            res.status(201).json(cart)
        }


    }

    getCartByUser = async (req: Request, res: Response) => {
        let userId = req.query.user_id;
        try {
            let cart = await Cart.findOne({
                user: {
                    _id: userId
                }
            });
            res.status(200).json(cart)
        } catch (error) {
            res.status(404).json(error.message)
        }
    }
}

export default new CartController();