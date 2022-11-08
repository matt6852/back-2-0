import { postsRepo } from "./../repo/posts-repo";
import { Router, Request, Response } from "express";

export const postsRouter = Router({});
postsRouter.get("/", (req: Request, res: Response) => {
  const result = postsRepo.getAllPosts();
  return res.send(result);
});
postsRouter.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const result = postsRepo.getSinglePost(id);
  return res.send(result);
});
postsRouter.post("/", (req: Request, res: Response) => {
  const result = postsRepo.createPost("body");
  return res.send(result);
});
postsRouter.put("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const result = postsRepo.updatedPost(id);
  return res.send(result);
});
postsRouter.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const result = postsRepo.deletedPost(id);
  return res.send(result);
});
