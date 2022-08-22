import {model, Schema} from "mongoose";
import { IProduct } from "./product";

export interface ICategory{
    name?: string;
    product?:IProduct;
}
const categorySchema = new Schema<ICategory>({
    name: String,
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})
const Category = model<ICategory>('Category', categorySchema);
export {Category}
