import {Router} from "express";
import productController from "../controller/productController";
// import {auth} from "../middleware/auth";

export const productRouter = Router();
// productRouter.use(auth)
productRouter.get('',productController.getAll);
productRouter.post('',productController.addProduct);
productRouter.get('/:id',productController.getProduct);
productRouter.put('/:id',productController.updateProduct);
productRouter.delete('/:id',productController.deleteProduct);