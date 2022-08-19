import {model, Schema} from "mongoose";
import {ICategory} from "./category"
import { IStore } from "./store";
export interface IProduct{
    name?: string;
    price?: number;
    amount?: number;
    image?: string;
    description?: string;
    category?: ICategory;
    store: IStore;

}
const productSchema = new Schema<IProduct>({
    name: String,
    price: Number,
    amount: Number,
    image: String,
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    store:[{
        type: Schema.Types.ObjectId,
        ref: 'Store'
    }]

})
const Product = model<IProduct>('Product',productSchema);
export {Product}