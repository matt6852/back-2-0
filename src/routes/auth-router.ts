import { Router, Request, Response } from "express";
import {
  credentialsInputValidator,
  validCredentials,
} from "../middlewares/auth-moddleware";
import { authService } from "../services/auth-service";

export const authRouter = Router({});

authRouter.post(
  "/login",
  validCredentials,
  credentialsInputValidator,
  async (req: Request, res: Response) => {
    // const createdUser = await userService.createSingleUser(req.body);
    const result = await authService.loginUser(
      req.body.loginOrEmail,
      req.body.password
    );
    if (result) return res.sendStatus(204);
    return res.sendStatus(401);
  }
);
