import console from "console";
import { Router, Request, Response } from "express";
import { authJWTMiddleware } from "../application/jwt-auth";
import {
  credentialsInputValidator,
  validCredentials,
} from "../middlewares/auth-middleware";
import { authService } from "../services/auth-service";

export const authRouter = Router({});

authRouter.post(
  "/login",
  validCredentials,
  credentialsInputValidator,
  async (req: Request, res: Response) => {
    const result = await authService.loginUser(
      req.body.loginOrEmail,
      req.body.password
    );

    if (result) return res.status(200).json(result);
    return res.sendStatus(401);
  }
);
authRouter.get(
  "/me",
  authJWTMiddleware,
  async (req: Request, res: Response) => {
    const me = {
      email: req?.user?.email,
      login: req?.user?.login,
      userId: req?.user?.id,
    };
    res.send(me);
  }
);
