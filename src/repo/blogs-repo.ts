import { BlogModel, IBlog } from "../models/blogModel";

export const blogsRepo = {
  async getAllBlogs() {
    return await BlogModel.find({}).exec();
  },
  async getSingleBlog(id: string) {
    try {
      return await BlogModel.findById(id).exec();
    } catch (error) {
      return null;
    }
  },
  async createBlog(newBlog: IBlog) {
    return await BlogModel.create(newBlog);
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
