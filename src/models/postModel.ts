import { Schema, model } from "mongoose";

interface IPost {
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

export const BlogModel = model<IPost>("Post", postSchema);
