import {model, Schema} from "mongoose";
import {IProduct} from "./product"
import {ICart} from './cart'
export interface IItem {
    price: number;
    amount : number,
    product : IProduct,
    cart : ICart,
    
}

const itemSchema = new Schema<IItem> ({
    price: Number,
    amount : Number,
    product : {
        type : Schema.Types.ObjectId,
        ref : 'Product'
    },
    cart : {
        type : Schema.Types.ObjectId,
        ref : 'Cart'
    }
})

const Item = model<IItem> ('Item', itemSchema)

export {Item}
