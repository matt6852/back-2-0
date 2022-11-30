import { usersRepo } from "./../repo/users/users-repo";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const jwtAuth = {
  createToken(id: string) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: "2h",
    });
    return { accessToken: token };
  },
  checkJWT(token: string) {
    try {
      const result: any = jwt.verify(token, process.env.JWT_SECRET!);
      return result;
    } catch (err) {
      return null;
    }
  },
};

export const authJWTMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  const token = headers.split(" ")[1];
  const result = jwtAuth.checkJWT(token);
  if (!result) return res.sendStatus(401);
  const user = await usersRepo.findUserById(result?.id!);
  if (!user) return res.sendStatus(401);
  req.user = user;
  return next();
};
