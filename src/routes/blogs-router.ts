import { postService } from "./../services/post-service";
import {
  validPost,
  postInputValidator,
  validPostWithOutID,
} from "./../middlewares/posts-middleware";
import { blogsRepo } from "./../repo/blogs-repo";
import { blogsQueryRepo } from "./../repo/query-blogs-repo";
import { blogService } from "./../services/blog-service";
import {
  blogsInputValidator,
  validBlog,
} from "./../middlewares/blogs-middleware";
import { Router, Request, Response } from "express";
import { authBasic } from "../application/auth-basic";

export const blogsRouter = Router({});
blogsRouter.get(
  "/",
  async (req: Request<{}, {}, {}, QueryTypeAllBlogs>, res: Response) => {
    const query: QueryTypeAllBlogs = {
      searchNameTerm: req.query.searchNameTerm || null,
      pageNumber: +req.query.pageNumber || 1,
      pageSize: +req.query.pageSize || 10,
      sortBy: req.query.sortBy || "createdAt",
      sortDirection: req.query.sortDirection || "desc",
    };
    const result = await blogsQueryRepo.getAllBlogs(query);
    return res.send(result);
  }
);
blogsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await blogsQueryRepo.getSingleBlog(id);
  if (result) {
    return res.status(200).send(result);
  }
  return res.sendStatus(404);
});
blogsRouter.get(
  "/:id/posts",
  async (
    req: Request<{ id: string }, {}, {}, QueryTypeAllPosts>,
    res: Response
  ) => {
    const id = req.params.id;
    const result = await blogsRepo.getSingleBlog(id);
    if (!result) return res.sendStatus(404);
    const query: QueryTypeAllPosts = {
      pageNumber: +req.query.pageNumber || 1,
      pageSize: +req.query.pageSize || 10,
      sortBy: req.query.sortBy || "createdAt",
      sortDirection: req.query.sortDirection || "desc",
    };
    const allPostsForSingleBlog = await blogsQueryRepo.getAllPostsForSingleBlog(
      query,
      id
    );
    res.send(allPostsForSingleBlog);
  }
);
blogsRouter.post(
  "/:id/posts",
  authBasic,
  validPostWithOutID,
  postInputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const exists = await blogsRepo.getSingleBlog(id);
    if (!exists) return res.sendStatus(404);
    req.body.blogId = id;
    const result = await postService.createSinglePost(req.body);
    if (result) return res.status(201).send(result);
  }
);
blogsRouter.post(
  "/",
  authBasic,
  validBlog,
  blogsInputValidator,
  async (req: Request, res: Response) => {
    const result = await blogService.createBlog(req.body);
    if (result) return res.status(201).send(result);
  }
);
blogsRouter.put(
  "/:id",
  authBasic,
  validBlog,
  blogsInputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await blogService.updateBlog(id, req.body);
    if (result) return res.sendStatus(204);
    return res.sendStatus(404);
  }
);
blogsRouter.delete("/:id", authBasic, async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await blogService.deleteBlog(id);
  if (result) return res.sendStatus(204);
  return res.sendStatus(404);
});

export interface QueryTypeAllPosts {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
}
export interface QueryTypeAllBlogs {
  searchNameTerm: string | null;
  pageSize: number;
  pageNumber: number;
  sortBy: string;
  sortDirection: string;
}
