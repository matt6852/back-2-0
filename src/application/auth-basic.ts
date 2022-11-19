import { NextFunction, Request, Response } from "express";
export const authBasic = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers.authorization;
  if (!headers) return res.sendStatus(401);
  const [login, password] = Buffer.from(headers.split(" ")[1], "base64")
    .toString()
    .split(":");
  if (login !== "admin" || password !== "qwerty") {
    return res.sendStatus(401);
  }
  return next();
};
