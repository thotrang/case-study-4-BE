import { model, Schema } from "mongoose"
import { IRole } from "./role";
export interface IUser {
    name: string,
    avatar: string,
    username: string,
    password: string,
    email: string,
    status: number,
    role: IRole

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
    }]
})
export const User = model<IUser>('User', UserSchema);