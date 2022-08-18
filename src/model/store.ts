import {model, Schema} from "mongoose";


interface IStore {
    name?: string;
    address?: string;
    userid?: number;
    image?: string

}

const storeSchema = new Schema<IStore>({
    name: String,
    address: String,
    userid: Number,
    image: String
});

const Store = model<IStore>('Store', storeSchema);
export {Store};