import {model, Schema} from "mongoose";

export interface IDiscount {
    name : string;
    sale : number;
    // cart : ICart;
}

const discountSchema = new Schema<IDiscount> ({
    name : String,
    sale : Number,
    // cart : {
    //     type : Schema.Types.ObjectId,
    //     ref : 'Cart'
    // }
})

const Discount = model<IDiscount>('Discount', discountSchema)

export {Discount}