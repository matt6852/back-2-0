import { Schema, model } from "mongoose";

export interface IBlog {
  name: string;
  description: string;
  websiteUrl: string;
}

const blogSchema = new Schema<IBlog>({
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 500 },
  websiteUrl: { type: String, required: true, maxlength: 100 },
});

export const BlogModel = model<IBlog>("Blog", blogSchema);
