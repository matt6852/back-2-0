import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
const reg =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const userInputValidator = (
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

export const validUser = [
  body("login").isString().isLength({ max: 10, min: 3 }).trim().not().isEmpty(),
  body("password").isString().isLength({ max: 20, min: 6 }),
  body("email").matches(reg),
];
export const validUserCode = [body("code").isString().trim().not().isEmpty()];
export const validUserEmailResending = [body("email").matches(reg)];
