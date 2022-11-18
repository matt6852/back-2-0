import { Schema, model } from "mongoose";

interface IBlog {
  name: string;
  youtubeUrl: string;
}

const blogSchema = new Schema<IBlog>({
  name: { type: String, required: true },
  youtubeUrl: { type: String, required: true, maxlength: 100 },
});

export const BlogModel = model<IBlog>("Blog", blogSchema);
