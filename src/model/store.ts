import {model, Schema} from "mongoose";
import { ICategory } from "./category";
import { IProduct } from "./product";
import { IUser } from "./user";


export interface IStore {
    name?: string;
    address?: string;
    image?: string;
    user: IUser,
    product:IProduct,
    category:ICategory

}

const storeSchema = new Schema<IStore>({
    name: String,
    address: String,
    image: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    category:[{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

const Store = model<IStore>('Store', storeSchema);
export {Store};