import {model, Schema} from "mongoose";
import { IUser } from "./user";


export interface IStore {
    name?: string;
    address?: string;
    userid?: number;
    image?: string;
    user: IUser

}

const storeSchema = new Schema<IStore>({
    name: String,
    address: String,
    userid: Number,
    image: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Store = model<IStore>('Store', storeSchema);
export {Store};