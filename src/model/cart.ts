import {model, Schema} from "mongoose";
import { IUser } from "./user";
import { IItem } from "./item";

export interface ICart {
    user: IUser;
    item: IItem;
}

const cartSchema = new Schema<ICart>({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item:[{
        type: Schema.Types.ObjectId,
        ref:'Item'
    }]
})

const Cart = model<ICart>('Cart', cartSchema);
export {Cart};