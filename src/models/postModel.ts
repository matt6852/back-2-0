import { Schema, model } from "mongoose";

export interface IPost {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: { type: Date; default: Date };
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  blogId: { type: String, required: true },
  blogName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const PostModel = model<IPost>("Post", postSchema);
