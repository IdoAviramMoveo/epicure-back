import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["USER", "ADMIN"], required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
