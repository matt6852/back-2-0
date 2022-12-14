import { type } from "os";
import { Schema, model } from "mongoose";

export interface IUser {
  login: string;
  password: string;
  email: string;
  isConfirmed: boolean;
  confirmCode: string;
  createdAt: { type: Date; default: Date };
  passwordCodeRecovery: { type: string };
  expirationCodeDate: Date;
  expirationCodeRecoveryPassword: Date;
}

const userSchema = new Schema<IUser>({
  login: { type: String, required: true, maxlength: 10, minlength: 3 },
  password: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isConfirmed: { type: Boolean, default: false },
  confirmCode: { type: String, default: null },
  passwordCodeRecovery: { type: String, default: null },
  expirationCodeDate: { type: Date },
  expirationCodeRecoveryPassword: { type: Date },
});

export const UserModel = model<IUser>("User", userSchema);
