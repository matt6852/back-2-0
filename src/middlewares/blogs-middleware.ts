import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
const reg = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/;

export const blogsInputValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    res.status(400).send(errors.array());
  }
};

export const validBlog = [
  body("name").isString().isLength({ max: 15 }).trim().not().isEmpty(),
  body("youtubeUrl").matches(reg).isLength({ max: 100 }),
];
