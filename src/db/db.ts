import { connect, disconnect } from "mongoose";

export const runDB = async () => {
  try {
    await connect(process.env.MONGO_URI!);
    console.log("Successfully connected to DB");
  } catch (error) {
    await disconnect();
    console.log(error, "Something went wrong");
  }
};
