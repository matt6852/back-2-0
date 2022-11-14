import {
  blogsInputValidator,
  validBlog,
} from "./../middlewares/blogs-middleware";
import { blogsRepo } from "./../repo/blogs-repo";
import { Router, Request, Response } from "express";

export const blogsRouter = Router({});
blogsRouter.get("/", (req: Request, res: Response) => {
  const result = blogsRepo.getAllBlogs();
  return res.send(result);
});
blogsRouter.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const result = blogsRepo.getSingleBlog(id);
  return res.send(result);
});
blogsRouter.post(
  "/",
  validBlog,
  blogsInputValidator,
  (req: Request, res: Response) => {
    const result = blogsRepo.createBlog("body");
    return res.send(result);
  }
);
blogsRouter.put("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const result = blogsRepo.updatedBlog(id);
  return res.send(result);
});
blogsRouter.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const result = blogsRepo.deletedBlog(id);
  return res.send(result);
});
