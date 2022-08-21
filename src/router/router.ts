import { Router } from "express";
import { routerAuth } from "./auth.router";
import { routerUser } from "./user.router";
import {cartRoute} from "./cart-route";
import {storeRoute} from "./store-route";
import {productRouter} from "./product-router";
import {categoryRouter} from "./category-router"

export const router = Router();
router.use('',routerAuth);
router.use('/admin', routerUser);
router.use('/admin/products', productRouter);
router.use('/admin/stores', storeRoute);
router.use('/admin/category', categoryRouter);


router.use('/user',routerUser);
router.use('/carts',cartRoute);
router.use('/user/store',storeRoute);
