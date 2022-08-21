import { Router } from "express";
import { routerAuth } from "./auth.router";
import { routerUser } from "./user.router";
import {cartRoute} from "./cart-route";
import {storeRoute} from "./store-route";
import {productRouter} from "./product-router";
import {itemRouter} from "./item-router";

export const router = Router();
router.use('',routerAuth);
router.use('/admin/:id', routerUser);
router.use('/user/:id',routerUser);
router.use('/carts',cartRoute);
router.use('/stores',storeRoute);
router.use('/products', productRouter)
router.use('/items', itemRouter)