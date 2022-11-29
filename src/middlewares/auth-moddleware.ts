import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
const reg =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const credentialsInputValidator = (
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

export const validCredentials = [
  body("loginOrEmail").isString().trim().not().isEmpty(),
  body("password").isString().trim().not().isEmpty(),
];
