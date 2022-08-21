import { Router } from "express";
import { checkAdmin } from "../middleware/checkAdmin";
import userController from "../controller/userController";
import { auth } from "../middleware/auth";
export const routerUser = Router();
routerUser.get('/users',auth, checkAdmin, userController.getAll);
routerUser.delete('/users/:id', auth, checkAdmin, userController.deleteUser);
routerUser.get('/users/:id', auth, checkAdmin, userController.getUser)
routerUser.put('/users/:id', auth, userController.uppdateUser)
routerUser.put('/users/lock/:id',auth, checkAdmin, userController.lockUser);
routerUser.get('/sellers',auth,checkAdmin, userController.getseller);

