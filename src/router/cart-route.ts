import {Router} from "express";
import cartController from "../controller/cartController";

export const cartRoute = Router();
cartRoute.post('', cartController.addToCart);
cartRoute.get('',cartController.getCartByUser);
