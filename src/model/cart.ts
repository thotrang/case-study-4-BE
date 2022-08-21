import {model, Schema} from "mongoose";
import {IUser} from "./user";
import {IItem} from "./item";
import {IDiscount} from "./discount";

export interface ICart {
    user: IUser;
    items: IItem[];
    status: number;
}

const cartSchema = new Schema<ICart>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    status: Number
})

const Cart = model<ICart>('Cart', cartSchema);
export {Cart};