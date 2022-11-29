import { Schema, model } from "mongoose";

export interface IUser {
  login: string;
  password: string;
  email: string;
  createdAt: { type: Date; default: Date };
}

const userSchema = new Schema<IUser>({
  login: { type: String, required: true, maxlength: 10, minlength: 3 },
  password: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = model<IUser>("User", userSchema);
