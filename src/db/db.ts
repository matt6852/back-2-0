import mongoose, { connect, disconnect } from "mongoose";
mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted.__v;
  },
});

export const runDB = async () => {
  try {
    await connect(process.env.MONGO_URI!);
    console.log("Successfully connected to DB");
  } catch (error) {
    await disconnect();
    console.log(error, "Something went wrong");
  }
};
