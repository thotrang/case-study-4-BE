import {Router} from "express";
import cartController from "../controller/cartController";

export const cartRoute = Router();
cartRoute.get('', cartController.getAll);
cartRoute.post('', cartController.addToCart);
cartRoute.delete('/:id', cartController.deleteCart);
cartRoute.get('/:id',cartController.getCart);
cartRoute.put('/:id',cartController.updateCart);
