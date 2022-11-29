import { BlogModel } from "../models/blogModel";
import { PostModel } from "../models/postModel";
import { QueryTypeAllPosts, QueryTypeAllBlogs } from "../routes/blogs-router";

export const blogsQueryRepo = {
  async getAllBlogs(query: QueryTypeAllBlogs) {
    const sortObj: any = {
      [query.sortBy]: query.sortDirection === "desc" ? -1 : 1,
    };
    const allBlogs = await BlogModel.find({
      name: {
        $regex: query.searchNameTerm ? query.searchNameTerm : "",
        $options: "i",
      },
    })
      .sort(sortObj)
      .limit(query.pageSize)
      .skip((query.pageNumber - 1) * query.pageSize);
    const count = await BlogModel.countDocuments({
      name: {
        $regex: query.searchNameTerm ? query.searchNameTerm : "",
        $options: "i",
      },
    });
    const formattedResult = {
      pagesCount: Math.ceil(count / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: count,
      items: allBlogs,
    };
    return formattedResult;
  },
  async getAllPostsForSingleBlog(query: QueryTypeAllPosts, id: string) {
    const sortObj: any = {
      [query.sortBy]: query.sortDirection === "desc" ? -1 : 1,
    };
    const allPosts = await PostModel.find({ blogId: id })
      .sort(sortObj)
      .limit(query.pageSize)
      .skip((query.pageNumber - 1) * query.pageSize);
    const count = await PostModel.countDocuments({ blogId: id });
    const formattedResult = {
      pagesCount: Math.ceil(count / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: count,
      items: allPosts,
    };
    return formattedResult;
  },
  async getSingleBlog(id: string) {
    try {
      return await BlogModel.findById(id);
    } catch (error) {
      return null;
    }
  },
};
