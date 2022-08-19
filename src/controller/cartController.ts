import {Request, Response} from "express";
import {Cart} from "../model/cart";


class CartController{
    getAll = async (req: Request, res: Response)=>{
        let carts = await Cart.find();
        res.status(200).json(carts);
    }
    addToCart = async (req: Request, res: Response)=>{
        let cart = req. body;
        cart = await Cart.create(cart);
        res.status(201).json(cart)

    }
    deleteCart = async (req: Request, res: Response)=>{
        let id = req.params.id;
        let cart = await Cart.findById(id);
        if (!cart){
            res.status(404).json()
        }else {
            cart.delete();
            res.status(200).json()
        }
    }
    getCart = async (req: Request, res: Response)=>{
        let id = req.params.id;
        try {
            let cart = await Cart.findById(id);
            res.status(200).json(cart)
        }catch (error){
            res.status(404).json(error.message)
        }
    }
    updateCart = async (req:Request, res: Response)=>{
        let id = req.params.id;
        let cart = await Cart.findById(id);
        if (!cart){
            res.status(404).json();
        }else {
            let data = req.body;
            await Cart.findOneAndUpdate({
                _id: id,
            },data);
            data._id =id;
            cart = await Cart.findById(id);
            res.status(200).json(cart)
        }

    }
    totalProduct = async ( req: Request, res: Response)=> {
    }



}

export default new CartController();