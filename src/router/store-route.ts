import {Router} from "express";
import storeController from "../controller/storeController";



export const storeRoute = Router();
storeRoute.get('', storeController.getAll);
storeRoute.post('', storeController.addStore);
storeRoute.delete('/:id', storeController.deleteStore);
storeRoute.get('/detail/:id',storeController.getStore);

storeRoute.get('/search?',storeController.searchStore);
storeRoute.put('/:id',storeController.updateStore);
