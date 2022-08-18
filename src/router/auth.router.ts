import { Router } from "express";
import authControler from "../controller/authController"
export const routerAuth = Router();
routerAuth.post('/register',authControler.register);
routerAuth.post('/login',authControler.login);