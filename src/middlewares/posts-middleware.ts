import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const postInputValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .send(
        errors
          .array({ onlyFirstError: true })
          .map((e) => ({ message: e.msg, field: e.param }))
      );
  }
  return next();
};

export const validPost = [
  body("title").isString().isLength({ max: 30 }).trim().not().isEmpty(),
  body("shortDescription")
    .isString()
    .isLength({ max: 100 })
    .trim()
    .not()
    .isEmpty(),
  body("content").isString().isLength({ max: 1000 }).trim().not().isEmpty(),
  body("blogId").isString().trim().not().isEmpty(),
];
