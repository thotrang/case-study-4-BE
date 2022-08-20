import { Router } from "express";
import { checkAdmin } from "../middleware/checkAdmin";
import userController from "../controller/userController";
import { auth } from "../middleware/auth";
export const routerUser = Router();
routerUser.get('/users',auth, checkAdmin, userController.getAll);
routerUser.delete('/users/:id', auth, checkAdmin, userController.deleteUser);
routerUser.get('/users/:id', auth, checkAdmin, userController.getUser)
routerUser.put('/users/:id', auth, userController.uppdateUser)
routerUser.put('/users/lock/:id', userController.lockUser);

routerUser.get('/role/:id', auth, checkAdmin, userController.getUserWithRole);