import {model, Schema} from "mongoose";
import {ICart} from "./cart";
import {IStore} from './store'
export interface IDiscount {
    name : string;
    sale : number;
    cart : ICart;
    store : IStore
}

const discountSchema = new Schema<IDiscount> ({
    name : String,
    sale : Number,
    cart : {
        type : Schema.Types.ObjectId,
        ref : 'Cart'
    }
})

const Discount = model<IDiscount>('Discount', discountSchema)

export {Discount}