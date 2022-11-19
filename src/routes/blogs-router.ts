import { blogService } from "./../services/blog-service";
import {
  blogsInputValidator,
  validBlog,
} from "./../middlewares/blogs-middleware";
import { Router, Request, Response } from "express";
import { authBasic } from "../application/auth-basic";

export const blogsRouter = Router({});
blogsRouter.get("/", async (req: Request, res: Response) => {
  const result = await blogService.getAllBlogs();
  return res.send(result);
});
blogsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await blogService.getSingleBlog(id);
  if (result) {
    return res.status(200).send(result);
  }
  return res.sendStatus(404);
});
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
