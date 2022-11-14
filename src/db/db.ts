import { MongoClient } from "mongodb";
export const client = new MongoClient(process.env.MONGO_URI!);

export const blogsCollection = client.db("blogs").collection("blogs");

export const runDB = async () => {
  try {
    await client.connect();
    console.log("Successfully connected to DB");
  } catch (error) {
    await client.close();
    console.log("Something went wrong");
  }
};
