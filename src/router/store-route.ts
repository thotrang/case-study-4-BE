import {Router} from "express";
import storeController from "../controller/storeController";



export const storeRoute = Router();
storeRoute.get('/stores', storeController.getAll);
storeRoute.post('/stores', storeController.addStore);

storeRoute.delete('/:id', storeController.deleteStore);
storeRoute.get('/search?',storeController.searchStore);
storeRoute.get('/detail/:id',storeController.getStore);
storeRoute.put('/:id',storeController.updateStore);
