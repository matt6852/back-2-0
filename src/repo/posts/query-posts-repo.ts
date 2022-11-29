import { PostModel } from "../../models/postModel";
import { QueryTypeAllPosts } from "../../routes/blogs-router";

export const postsQueryRepo = {
  async getAllPosts(query: QueryTypeAllPosts) {
    const sortObj: any = {
      [query.sortBy]: query.sortDirection === "desc" ? -1 : 1,
    };
    const allPosts = await PostModel.find({})
      .sort(sortObj)
      .limit(query.pageSize)
      .skip((query.pageNumber - 1) * query.pageSize);
    const count = await PostModel.countDocuments({});
    const formattedResult = {
      pagesCount: Math.ceil(count / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: count,
      items: allPosts,
    };
    return formattedResult;
  },
  async getSinglePost(id: string) {
    try {
      return await PostModel.findById(id);
    } catch (error) {
      return null;
    }
  },
};
