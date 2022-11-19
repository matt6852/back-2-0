import { postsRepo } from "./../repo/posts-repo";
import { Router, Request, Response } from "express";
import { postInputValidator, validPost } from "../middlewares/posts-middleware";
import { authBasic } from "../application/auth-basic";

export const postsRouter = Router({});
postsRouter.get("/", async (req: Request, res: Response) => {
  const result = postsRepo.getAllPosts();
  return res.send(result);
});
postsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = postsRepo.getSinglePost(id);
  return res.send(result);
});
postsRouter.post(
  "/",
  authBasic,
  validPost,
  postInputValidator,
  async (req: Request, res: Response) => {
    const result = postsRepo.createPost("body");
    return res.send(result);
  }
);
postsRouter.put(
  "/:id",
  authBasic,
  validPost,
  postInputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = postsRepo.updatedPost(id);
    return res.send(result);
  }
);
postsRouter.delete("/:id", authBasic, async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = postsRepo.deletedPost(id);
  return res.send(result);
});
