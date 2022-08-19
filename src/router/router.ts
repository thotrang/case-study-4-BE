import { Router } from "express";
import { routerAuth } from "./auth.router";
import { routerUser } from "./user.router";
import { checkAdmin } from "../middleware/auth";
import { categoryRouter } from "./category-router";
import {productRouter} from "./product-router";
import {cartRoute} from "./cart-route";
import {storeRoute} from "./store-route";
import {itemRoute} from "./item.router";
import {discountRoute} from "./discount.router";

export const router = Router();
router.use('',routerAuth);
router.use('/admin/:id',checkAdmin, routerUser);
router.use('/user/:id',routerUser);
router.use('/products',productRouter);
router.use('/categories',categoryRouter);
router.use('/carts',cartRoute);
router.use('/stores',storeRoute);
router.use('/item',itemRoute)
router.use('/discount',discountRoute);