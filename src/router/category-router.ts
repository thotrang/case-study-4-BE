import {Router} from "express";
import categoryController from "../controller/categoryController";
// import {auth} from "../middleware/auth";

export const categoryRouter = Router();
// categoryRouter.use(auth)
categoryRouter.get('',categoryController.getAll);
categoryRouter.post('',categoryController.addCategory);
categoryRouter.get('/:id',categoryController.getCategory);

categoryRouter.put('/:id',categoryController.updateCategory);
categoryRouter.delete('/:id',categoryController.deleteCategory);