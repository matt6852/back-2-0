import { blogsQueryRepo } from "./../repo/query-blogs-repo";
import { IBlog } from "../models/blogModel";
import { blogsRepo } from "./../repo/blogs-repo";
export const blogService = {
  async createBlog(newBlog: IBlog) {
    return await blogsRepo.createBlog(newBlog);
  },
  async updateBlog(id: string, updateBlog: IBlog) {
    return await blogsRepo.updatedBlog(id, updateBlog);
  },
  async deleteBlog(id: string) {
    return await blogsRepo.deleteBlog(id);
  },
};
