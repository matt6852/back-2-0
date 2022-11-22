import { BlogModel } from "./../models/blogModel";
import { blogsRepo } from "./../repo/blogs-repo";
import { Router, Request, Response } from "express";
import { PostModel } from "../models/postModel";

export const deleteAll = Router({});
deleteAll.get("/all-data", async (req: Request, res: Response) => {
  await BlogModel.deleteMany({});
  await PostModel.deleteMany({});
  return res.sendStatus(204);
});
