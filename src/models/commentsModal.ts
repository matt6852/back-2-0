import { Schema, model } from "mongoose";

export interface IComment {
  content: string;
  userId: string;
  userLogin: string;
  createdAt: { type: Date; default: Date };
}

const commentsSchema = new Schema<IComment>({
  content: { type: String, required: true },
  userId: { type: String, required: true },
  userLogin: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const CommentModel = model<IComment>("Comments", commentsSchema);
