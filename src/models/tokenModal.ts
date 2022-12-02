import { Schema, model } from "mongoose";

export interface IToken {
  token: string;
  expireAt: { type: Date; default: Date };
}

const userSchema = new Schema<IToken>({
  token: { type: String, required: true },
  expireAt: { type: Date, default: Date.now },
});

export const TokenModel = model<IToken>("Token", userSchema);
