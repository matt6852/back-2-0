import { blogsRepo } from "./../repo/blogs-repo";
import { IPost } from "./../models/postModel";
import { postsRepo } from "./../repo/posts-repo";
export const postService = {
  async getAllPosts() {
    return await postsRepo.getAllPosts();
  },
  async getSinglePost(id: string) {
    return await postsRepo.getSinglePost(id);
  },
  async createSinglePost(newPost: IPost) {
    const { blogId } = newPost;

    const isBlogExists = await blogsRepo.getSingleBlog(blogId);
    const updatedNewPost = {
      ...newPost,
      blogName: isBlogExists?.name!,
    };
    const result = await postsRepo.createPost(updatedNewPost);
    if (!result) {
      return {
        errorsMessages: [
          {
            message: "Something went wrong",
          },
        ],
      };
    }
    return updatedNewPost;
  },
  async updateSinglePost(id: string, data: IPost) {
    const result = await postsRepo.updateSinglePost(id, data);
    return result;
  },
  async deleteBlog(id: string) {
    const result = await postsRepo.deletedPost(id);
    return result;
  },
};
