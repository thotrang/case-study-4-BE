import {Router} from "express";
import discountController from "../controller/discountController";

export const discountRoute = Router()

discountRoute.get('',discountController.getAll)
discountRoute.post('',discountController.addDiscount)
discountRoute.delete('/:id',discountController.deleteDiscount)