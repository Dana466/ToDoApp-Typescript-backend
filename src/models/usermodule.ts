import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from 'types/userinterface';


const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const UserModel: Model<IUser> = mongoose.model<IUser>("usermodel", UserSchema);
export default UserModel;
