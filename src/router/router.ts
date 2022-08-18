import { Router } from "express";
import { routerAuth } from "./auth.router";
import { routerUser } from "./user.router";
import { checkAdmin } from "../middleware/auth";

export const router = Router();
router.use('',routerAuth);
router.use('/admin/:id',checkAdmin, routerUser);
router.use('/user/:id',routerUser);