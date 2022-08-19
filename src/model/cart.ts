import {model, Schema} from "mongoose";
import { IUser } from "./user";
import { IItem } from "./item";
import { IDiscount } from "./discount";

export interface ICart {
    price?: number;
    amount?: number;
    image?: string;
    total?: number;
    user: IUser;
    item: IItem;
    discount:IDiscount,
}

const cartSchema = new Schema<ICart>({
    price: Number,
    amount: Number,
    image: String,
    total: Number,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item:[{
        type: Schema.Types.ObjectId,
        ref:'Item'
    }],
    discount:[{
        type: Schema.Types.ObjectId,
        ref:'Discount'
    }]
})

const Cart = model<ICart>('Cart', cartSchema);
export {Cart};