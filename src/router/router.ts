import { Router } from "express";
import { routerAuth } from "./auth.router";
export const router = Router();
router.use('',routerAuth);