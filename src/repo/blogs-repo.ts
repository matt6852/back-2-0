import { BlogModel, IBlog } from "../models/blogModel";

export const blogsRepo = {
  async createBlog(newBlog: IBlog) {
    return await BlogModel.create(newBlog);
  },
  async getSingleBlog(id: string) {
    try {
      return await BlogModel.findById(id);
    } catch (error) {
      return null;
    }
  },
  async updatedBlog(id: string, data: IBlog) {
    try {
      const result = await BlogModel.findByIdAndUpdate(id, data);
      return result;
    } catch (error) {
      return null;
    }
  },
  async deleteBlog(id: string) {
    try {
      const result = await BlogModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      return null;
    }
  },
};
