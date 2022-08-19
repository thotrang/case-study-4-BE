import { Router } from "express";
import authController from "../controller/authController";
export const routerAuth = Router();
routerAuth.post('/register',authController.register);
routerAuth.post('/login',authController.login);