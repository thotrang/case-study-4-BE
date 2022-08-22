import { Router } from "express";
import { checkAdmin } from "../middleware/checkAdmin";
import userController from "../controller/userController";
import { auth } from "../middleware/auth";
export const routerUser = Router();
routerUser.use(auth);
routerUser.get('/users', checkAdmin, userController.getAll);
routerUser.delete('/users/:id', checkAdmin, userController.deleteUser);
routerUser.get('/users/:id', checkAdmin, userController.getUser)
routerUser.put('/users/:id', userController.uppdateUser)

routerUser.put('/users/lock/:id', checkAdmin, userController.lockUser);
routerUser.get('/sellers', checkAdmin, userController.getseller);
routerUser.get('/myProfile', userController.getUserToLocalStorage);

