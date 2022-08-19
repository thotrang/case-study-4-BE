import { Router } from "express";
import { routerAuth } from "./auth.router";
import { routerUser } from "./user.router";

export const router = Router();
router.use('',routerAuth);
router.use('/admin/:id', routerUser);
router.use('/user/:id',routerUser);