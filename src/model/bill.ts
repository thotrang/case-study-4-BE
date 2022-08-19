import { model, Schema } from "mongoose";
import { ICart } from "./cart";
import { IStore } from "./store";
import { IUser } from "./user";

export interface IBill{
    user:IUser,
    store:IStore,
    cart: ICart

}
const billSchema = new Schema<IBill>({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
const Bill = model<IBill>('Bill', billSchema);
export {Bill};