import { Schema, model } from "mongoose";

export interface IPost {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  blogId: { type: String, required: true },
});

export const PostModel = model<IPost>("Post", postSchema);
