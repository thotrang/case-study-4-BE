import { Router } from "express";
import userController from "../controller/userController"
export const routerUser = Router();
routerUser.get('', userController.getAll);
routerUser.put('', userController.lockUser)
routerUser.delete('/:id', userController.deleteUser)
routerUser.get('/:id', userController.getUser)
routerUser.put('/:id', userController.uppdateUser)
routerUser.get('/role/:id',userController.getUserWithRole);