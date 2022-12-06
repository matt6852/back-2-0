import {
  validComment,
  commentInputValidator,
} from "./../middlewares/comments-middleware";
import { commentsQueryRepo } from "./../repo/comments/query-comments-repo";
import { Router, Request, Response } from "express";
import { authJWTMiddleware } from "../application/jwt-auth";

export const commentsRouter = Router({});

commentsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const singleComment = await commentsQueryRepo.getSingleComment(id);
  if (!singleComment) return res.sendStatus(404);
  return res.send(singleComment);
});
commentsRouter.delete(
  "/:id",
  authJWTMiddleware,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = req.user.id;
    const singleComment = await commentsQueryRepo.getSingleComment(id);
    if (!singleComment) return res.sendStatus(404);
    const result = await commentsQueryRepo.deleteComment(id, userId);
    if (!result) return res.sendStatus(403);
    return res.sendStatus(204);
  }
);
commentsRouter.put(
  "/:id",
  authJWTMiddleware,
  validComment,
  commentInputValidator,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = req.user.id;
    const content = req.body.content;
    const singleComment = await commentsQueryRepo.getSingleComment(id);
    if (!singleComment) return res.sendStatus(404);
    const result = await commentsQueryRepo.updatedComment(id, userId, content);
    if (!result) return res.sendStatus(403);
    return res.sendStatus(204);
  }
);
