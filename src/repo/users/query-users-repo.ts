import { UserModel } from "../../models/userModal";
import { QueryTypeAllUsers } from "./../../routes/users-router";

export const usersQueryRepo = {
  async getAllUsers(query: QueryTypeAllUsers) {
    const sortObj: any = {
      [query.sortBy]: query.sortDirection === "desc" ? -1 : 1,
    };
    const allUsers = await UserModel.find({
      login: {
        $regex: query.searchLoginTerm ? query.searchLoginTerm : "",
        $options: "i",
      },
      email: {
        $regex: query.searchEmailTerm ? query.searchEmailTerm : "",
        $options: "i",
      },
    })
      .sort(sortObj)
      .limit(query.pageSize)
      .skip((query.pageNumber - 1) * query.pageSize);
    const count = await UserModel.countDocuments({
      login: {
        $regex: query.searchLoginTerm ? query.searchLoginTerm : "",
        $options: "i",
      },
      email: {
        $regex: query.searchEmailTerm ? query.searchEmailTerm : "",
        $options: "i",
      },
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
