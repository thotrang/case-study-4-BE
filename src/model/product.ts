import {model, Schema} from "mongoose";
import {ICategory} from "./category"
interface IProduct{
    name?: string;
    price?: number;
    amount?: number;
    image?: string;
    description?: string;
    category?: ICategory;
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
    }
})
const Product = model<IProduct>('Product',productSchema);
export {Product}