import { CommentType } from "../routes/posts-router";
import { commentsRepo } from "../repo/comments/comments-repo";
export const commentsService = {
  async createSingComment(newComment: CommentType) {
    const result = await commentsRepo.createComment(newComment);
    return result;
  },
};
