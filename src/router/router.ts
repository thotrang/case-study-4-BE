import { Router } from "express";
// import { routerAuth } from "./auth.router";
import { categoryRouter } from "./category-router";
import {productRouter} from "./product-router";
export const router = Router();
// router.use('',routerAuth);
router.use('/products',productRouter);
router.use('/categories',categoryRouter);