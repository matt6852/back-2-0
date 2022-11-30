import { CommentModel } from "./../../models/commentsModal";
import { QueryTypeAllPosts } from "../../routes/blogs-router";

export const commentsQueryRepo = {
  async getAllComments(query: QueryTypeAllPosts) {
    const sortObj: any = {
      [query.sortBy]: query.sortDirection === "desc" ? -1 : 1,
    };
    const allPosts = await CommentModel.find({})
      .sort(sortObj)
      .limit(query.pageSize)
      .skip((query.pageNumber - 1) * query.pageSize);
    const count = await CommentModel.countDocuments({});
    const formattedResult = {
      pagesCount: Math.ceil(count / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: count,
      items: allPosts,
    };
    return formattedResult;
  },
  async getSingleComment(id: string) {
    try {
      const result = await CommentModel.findById(id);
      if (result) {
        const formattedResult = {
          id: result?.id,
          content: result?.content,
          userId: result?.userId,
          userLogin: result?.userLogin,
          createdAt: result?.createdAt,
        };
        return formattedResult;
      }
    } catch (error) {
      return null;
    }
  },
  async deleteComment(id: string, userId: string) {
    const result = await CommentModel.findOneAndDelete({
      id: id,
      userId: userId,
    });
    return result;
  },
  async updatedComment(id: string, userId: string, content: string) {
    const result = await CommentModel.findOneAndUpdate(
      {
        id: id,
        userId: userId,
      },
      { content }
    );
    return result;
  },
};
