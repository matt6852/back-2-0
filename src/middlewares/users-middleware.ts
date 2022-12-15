import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user-service";
import { usersRepo } from "../repo/users/users-repo";
import { authService } from "../services/auth-service";
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
export const setNewPassword = [
  body("recoveryCode").isString().trim().not().isEmpty(),
  body("newPassword")
    .isString()
    .trim()
    .not()
    .isEmpty()
    .isLength({ max: 20, min: 6 }),
];
export const validUserCode = [body("code").isString().trim().not().isEmpty()];

export const validUserEmailResending = [body("email").matches(reg)];

export const isCodeValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.body;
  const findUserByCode = await userService.getUserByCode(code);
  if (!findUserByCode)
    return res.status(400).send({
      errorsMessages: [
        {
          message: "Invalid value",
          field: "code",
        },
      ],
    });
  next();
};
export const isRecoveryCodePasswordValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { recoveryCode, newPassword } = req.body;
  const findUserByCode = await userService.getUserByRecoveryCodePassword(
    recoveryCode,
    newPassword
  );
  if (!findUserByCode) return res.sendStatus(400);
  next();
};
export const isEmailValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const isUserExists = await usersRepo.findUserByEmail(email);
  if (!isUserExists)
    return res.status(400).send({
      errorsMessages: [
        {
          message: "Invalid value",
          field: "email",
        },
      ],
    });
  await authService.resendingEmail(isUserExists.email, isUserExists.id);
  next();
};
export const isEmailOrLoginValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, login } = req.body;
  const isUserExists = await usersRepo.findUserByEmailOrLogin(email, login);
  if (isUserExists) {
    return res.status(400).send({
      errorsMessages: [
        {
          message: "Invalid value",
          field: email === isUserExists.email ? "email" : "login",
        },
      ],
    });
  }
  next();
};
