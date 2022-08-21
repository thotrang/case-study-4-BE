import { model, Schema } from "mongoose";
import { IDiscount } from "./discount";
import { IProduct } from "./product";
import { IUser } from "./user";

export interface IOder{
    product:IProduct,
    date: Date,
    total: number,
    user: IUser,
    discount:IDiscount,

}
const oderSchema = new Schema<IOder>({
    product:[{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    discount:[{
        type: Schema.Types.ObjectId,
        ref:'Discount'
    }],
    date:Date,
    total:Number
})
export const Product = model<IOder>('Oder',oderSchema);
