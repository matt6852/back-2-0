import { Router, Request, Response } from "express";
import { authBasic } from "../application/auth-basic";
import { validUser, userInputValidator } from "../middlewares/users-middleware";
import { usersQueryRepo } from "../repo/users/query-users-repo";
import { userService } from "../services/user-service";

export const userRouter = Router({});
userRouter.get(
  "/",
  authBasic,
  async (req: Request<{}, {}, {}, any>, res: Response) => {
    const query: QueryTypeAllUsers = {
      searchLoginTerm: req.query.searchLoginTerm || null,
      searchEmailTerm: req.query.searchEmailTerm || null,
      pageNumber: +req.query.pageNumber || 1,
      pageSize: +req.query.pageSize || 10,
      sortBy: req.query.sortBy || "createdAt",
      sortDirection: req.query.sortDirection || "desc",
    };

    const result = await usersQueryRepo.getAllUsers(query);
    return res.send(result);
  }
);
userRouter.post(
  "/",
  authBasic,
  validUser,
  userInputValidator,
  async (req: Request, res: Response) => {
    const createdUser = await userService.createSingleUser(req.body);
    return res.status(201).send(createdUser);
  }
);

userRouter.delete("/:id", authBasic, async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userService.deleteUser(id);
  if (result) return res.sendStatus(204);
  return res.sendStatus(404);
});

export interface QueryTypeAllUsers {
  searchLoginTerm: string | null;
  searchEmailTerm: string | null;
  pageSize: number;
  pageNumber: number;
  sortBy: string;
  sortDirection: string;
}
