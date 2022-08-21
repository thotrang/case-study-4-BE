import { model, Schema } from "mongoose"
import { IRole } from "./role";
import {IStore} from "./store";
import {ICart} from "./cart"
import { IBill } from "./bill";
import { IOder } from "./oder";
export interface IUser {
    name: string,
    avatar: string,
    username: string,
    password: string,
    email: string,
    address:string,
    status: number,
    role: IRole,
    store: IStore,
    cart : ICart,
    bill: IBill,
    oder: IOder
}
const UserSchema = new Schema<IUser>({
    name: String,
    avatar: String,
    username: String,
    password: String,
    address:String,
    email: String,
    status: Number,
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }],
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store'
    },
    cart : {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    bill:[
        {
            type: Schema.Types.ObjectId,
        ref: 'Bill'
        }
    ],
    oder:[{
        type:Schema.Types.ObjectId,
        ref: 'Oder'
    }]
})
export const User = model<IUser>('User', UserSchema);