import {model, Schema} from "mongoose";

export interface ICart {
    name?: string;
    price?: number;
    amount?: number;
    image?: string;
    total?: number;
    user: IUser;
    item: IItem;
    discount:IDiscount,
}

const cartSchema = new Schema<ICart>({
    name: String,
    price: Number,
    amount: Number,
    image: String,
    total: Number
})

const Cart = model<ICart>('Cart', cartSchema);
export {Cart};