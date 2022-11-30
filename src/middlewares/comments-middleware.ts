import { BlogModel } from "./../models/blogModel";
import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const commentInputValidator = (
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

export const validComment = [
  body("content")
    .isString()
    .isLength({ max: 300, min: 20 })
    .trim()
    .not()
    .isEmpty(),
];
