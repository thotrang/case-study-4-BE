import { model, Schema } from "mongoose"
import { IRole } from "./role";
import {IStore} from "./store";
import {ICart} from "./cart"
export interface IUser {
    name: string,
    avatar: string,
    username: string,
    password: string,
    email: string,
    status: number,
    role: IRole,
    store: IStore,
    cart : ICart
}
const UserSchema = new Schema<IUser>({
    name: String,
    avatar: String,
    username: String,
    password: String,
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
    }
})
export const User = model<IUser>('User', UserSchema);