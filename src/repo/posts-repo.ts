import { type } from "os";
import { IPost, PostModel } from "../models/postModel";

export const postsRepo = {
  async getAllPosts() {
    const res = await PostModel.find({});
    console.log(res, "res");

    return res;
  },
  async getSinglePost(id: string) {
    try {
      return await PostModel.findById(id);
    } catch (error) {
      return null;
    }
  },
  async createPost(data: SinglePost) {
    const result = await PostModel.create(data);

    if (result) return result;
  },

  async updateSinglePost(id: string, data: IPost) {
    try {
      const result = await PostModel.findByIdAndUpdate(id, data);
      return result;
    } catch (error) {
      return null;
    }
  },
  async deletedPost(id: string) {
    try {
      const result = await PostModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      return null;
    }
  },
};

type SinglePost = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
};
