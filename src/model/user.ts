import { model, Schema } from "mongoose"
import {IRole} from "./role";
interface IUser{
    // name: string,
    // avatar: string,
    // username:string,
    // password: string,
    // role: IRole

}
const UserSchema = new Schema<IUser>({
    // name:String,
    // avatar:String,
    // username:String,
    // password:String,
    // role: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Role'
    // }

})
export const User = model<IUser>('User',UserSchema);