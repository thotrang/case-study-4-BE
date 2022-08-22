import {Router} from "express";
import { auth } from "../middleware/auth";
import storeController from "../controller/storeController";



export const storeRoute = Router();
storeRoute.use(auth)
storeRoute.get('', storeController.getAll);
storeRoute.post('', storeController.addStore);
storeRoute.delete('/:id', storeController.deleteStore);
storeRoute.get('/detail/:id',storeController.getStore);

storeRoute.get('/search?',storeController.searchStore);
storeRoute.put('/:id',storeController.updateStore);
