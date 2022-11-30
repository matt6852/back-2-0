import { CommentType } from "../../routes/posts-router";
import { CommentModel } from "./../../models/commentsModal";

export const commentsRepo = {
  async createComment(comment: CommentType) {
    const result = await CommentModel.create(comment);
    if (!result) return null;
    return {
      userId: result.userId,
      content: result.content,
      userLogin: result.userLogin,
      id: result.id,
      createdAt: result.createdAt,
    };
  },
};
