import { DeviceModel } from "./../models/deviceModal";
import { CommentModel } from "./../models/commentsModal";
import { BlogModel } from "./../models/blogModel";
import { Router, Request, Response } from "express";
import { PostModel } from "../models/postModel";
import { UserModel } from "../models/userModal";
import { TokenModel } from "../models/tokenModal";

export const deleteAll = Router({});
deleteAll.delete("/all-data", async (req: Request, res: Response) => {
  await BlogModel.deleteMany({});
  await PostModel.deleteMany({});
  await UserModel.deleteMany({});
  await CommentModel.deleteMany({});
  // await TokenModel.deleteMany({});
  await DeviceModel.deleteMany({});
  return res.sendStatus(204);
});
