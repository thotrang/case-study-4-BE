import { Router } from "express";
import { routerAuth } from "./auth.router";
import { routerUser } from "./user.router";
import { checkAdmin } from "../middleware/auth";
import {cartRoute} from "./cart-route";
import {storeRoute} from "./store-route";
import {categoryRouter} from "./category-router"
import { productRouter } from "./product-router"

export const router = Router();
router.use('',routerAuth);
router.use('/admin/:id',checkAdmin, routerUser);
router.use('/user/:id',routerUser);
router.use('/carts',cartRoute);
router.use('/stores',storeRoute);
router.use('/category', categoryRouter);
router.use('/products',productRouter)

