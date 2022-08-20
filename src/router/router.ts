import { Router } from "express";
import { routerAuth } from "./auth.router";
import { routerUser } from "./user.router";
import {cartRoute} from "./cart-route";
import {storeRoute} from "./store-route";
import {productRouter} from "./product-router";

export const router = Router();
router.use('',routerAuth);
router.use('/admin', routerUser);
router.use('/admin', productRouter);
router.use('/admin', storeRoute);

router.use('/user',routerUser);
router.use('/carts',cartRoute);
router.use('/stores',storeRoute);
