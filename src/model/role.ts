import { model, Schema } from "mongoose";
import {IUser} from "./user";
export interface IRole{
    name: string,
    users: IUser
}
const RoleSchema = new Schema<IRole>({
    name:String,
    users:[{
        type: Schema.Types.ObjectId,
        ref:'User'
    }]

})
const Role = model<IRole>('Role',RoleSchema);
export {Role};