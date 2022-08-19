import {model, Schema} from "mongoose";
import { IUser } from "./user";

export interface ICart {
    name?: string;
    price?: number;
    amount?: number;
    image?: string;
    total?: number;
    user: IUser

}

const cartSchema = new Schema<ICart>({
    name: String,
    price: Number,
    amount: Number,
    image: String,
    total: Number,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Cart = model<ICart>('Cart', cartSchema);
export {Cart};