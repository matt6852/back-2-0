import { UserModel } from "../../models/userModal";
import { QueryTypeAllUsers } from "./../../routes/users-router";

export const usersQueryRepo = {
  async getAllUsers(query: QueryTypeAllUsers) {
    const sortObj: any = {
      [query.sortBy]: query.sortDirection === "desc" ? -1 : 1,
    };
    const allUsers = await UserModel.find(
      {
        $or: [
          {
            login: {
              $regex: query.searchLoginTerm || "",
              $options: "i",
            },
          },
          {
            email: {
              $regex: query.searchEmailTerm || "",
              $options: "i",
            },
          },
        ],
      },

      {
        password: 0,
        isConfirmed: 0,
        confirmCode: 0,
        expirationCodeDate: 0,
        passwordCodeRecovery: 0,
        expirationCodeRecoveryPassword: 0,
      }
    )
      .sort(sortObj)
      .limit(query.pageSize)
      .skip((query.pageNumber - 1) * query.pageSize);
    const count = await UserModel.countDocuments({
      $or: [
        {
          login: {
            $regex: query.searchLoginTerm || "",
            $options: "i",
          },
        },
        {
          email: {
            $regex: query.searchEmailTerm || "",
            $options: "i",
          },
        },
      ],
    });
    const formattedResult = {
      pagesCount: Math.ceil(count / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: count,
      items: allUsers,
    };
    return formattedResult;
  },
};
