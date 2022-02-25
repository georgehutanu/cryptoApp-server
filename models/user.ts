import { Schema, model } from 'mongoose'
import IUser from "../shared/interfaces/user";

const userSchema = new Schema({
    userID: { type: String, required: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true },
    portfolio: {
        type: [{ id: String , amount: Number}], required: true
    },
    watchlist: {type: [String]}
})

export default model<IUser>('User', userSchema)