import {Router} from "express";
import itemController from "../controller/itemController";

export const itemRoute = Router()

itemRoute.get('',itemController.getALl)
itemRoute.post('',itemController.addItem)
itemRoute.put('/:id',itemController.updateItem)
itemRoute.delete('/:id',itemController.deleteItem)
