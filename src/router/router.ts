import { Router } from "express";
import { routerAuth } from "./auth.router";
import { routerUser } from "./user.router";
import { checkAdmin } from "../middleware/auth";
import {cartRoute} from "./cart-route";
import {storeRoute} from "./store-route";

export const router = Router();
router.use('',routerAuth);
router.use('/admin/:id',checkAdmin, routerUser);
router.use('/user/:id',routerUser);
router.use('/carts',cartRoute);
router.use('/stores',storeRoute);

