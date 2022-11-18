import { BlogModel } from "./../models/blogModel";
import {
  blogsInputValidator,
  validBlog,
} from "./../middlewares/blogs-middleware";
import { blogsRepo } from "./../repo/blogs-repo";
import { Router, Request, Response } from "express";

export const blogsRouter = Router({});
blogsRouter.get("/", async (req: Request, res: Response) => {
  const result = await BlogModel.find({}).lean();
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
  async (req: Request, res: Response) => {
    await BlogModel.create({ name: "Jean-Luc Picard", url: "test URl" });
    // const result = blogsRepo.createBlog("body");
    return res.send("test");
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
