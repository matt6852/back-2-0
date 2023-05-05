import { Schema, model } from "mongoose";

// export interface IBlog {
//   name: string;
//   description: string;
//   websiteUrl: string;
//   createdAt: { type: Date; default: Date };
// }

const geoSchema = new Schema({
  data:{type: Object}
});

export const BlogModel = model("Geo", geoSchema);
