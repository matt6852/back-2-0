import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
const reg = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/;

export const blogsInputValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errorsMessages: errors
        .array({ onlyFirstError: true })
        .map((e) => ({ message: "Invalid value", field: e.param })),
    });
  }
  return next();
};

export const validBlog = [
  body("name").isString().isLength({ max: 15 }).trim().not().isEmpty(),
  body("description").isString().isLength({ max: 500 }),
  body("websiteUrl").matches(reg).isLength({ max: 100 }),
];
