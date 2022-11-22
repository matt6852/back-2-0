import { blogsRepo } from "./../repo/blogs-repo";
import { postService } from "./../services/post-service";
import { postsRepo } from "./../repo/posts-repo";
import { Router, Request, Response } from "express";
import { postInputValidator, validPost } from "../middlewares/posts-middleware";
import { authBasic } from "../application/auth-basic";

export const postsRouter = Router({});
postsRouter.get("/", async (req: Request, res: Response) => {
  const result = await postService.getAllPosts();
  return res.send(result);
});
postsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await postService.getSinglePost(id);
  if (result) {
    return res.status(200).send(result);
  }
  return res.sendStatus(404);
});
postsRouter.post(
  "/",
  authBasic,
  validPost,
  postInputValidator,
  async (req: Request, res: Response) => {
    const result = await postService.createSinglePost(req.body);
    if (result) return res.status(201).send(result);
  }
);
postsRouter.put(
  "/:id",
  authBasic,
  validPost,
  postInputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await postService.updateSinglePost(id, req.body);
    if (result) return res.sendStatus(204);
    return res.sendStatus(404);
  }
);
postsRouter.delete("/:id", authBasic, async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await postService.deletePost(id);
  if (result) return res.sendStatus(204);
  return res.sendStatus(404);
});
