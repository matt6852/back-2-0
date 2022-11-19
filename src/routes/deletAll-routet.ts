import { BlogModel } from "./../models/blogModel";
import { blogsRepo } from "./../repo/blogs-repo";
import { Router, Request, Response } from "express";

export const deleteAll = Router({});
deleteAll.get("/all-data", async (req: Request, res: Response) => {
  await BlogModel.deleteMany({});
  return res.send("all clean");
});
