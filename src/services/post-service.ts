import { commentsQueryRepo } from "./../repo/comments/query-comments-repo";
import { blogsRepo } from "../repo/blogs/blogs-repo";
import { IPost } from "./../models/postModel";
import { postsRepo } from "../repo/posts/posts-repo";
import { blogsQueryRepo } from "../repo/blogs/query-blogs-repo";
export const postService = {
  async createSinglePost(newPost: IPost) {
    const { blogId } = newPost;
    const isBlogExists = await blogsQueryRepo.getSingleBlog(blogId);
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
    return { ...updatedNewPost, id: result.id, createdAt: result.createdAt };
  },
  async updateSinglePost(id: string, data: IPost) {
    const result = await postsRepo.updateSinglePost(id, data);
    return result;
  },
  async deletePost(id: string) {
    const result = await postsRepo.deletedPost(id);
    await commentsQueryRepo.deleteMany(id);
    return result;
  },
};
