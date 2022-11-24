import { Schema, model } from "mongoose";

export interface IBlog {
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: { type: Date; default: Date };
}

const blogSchema = new Schema<IBlog>({
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 500 },
  websiteUrl: { type: String, required: true, maxlength: 100 },
  createdAt: { type: Date, default: Date.now },
});

export const BlogModel = model<IBlog>("Blog", blogSchema);
