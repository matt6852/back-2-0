import "dotenv/config";
import { runDB } from "./db/db";
import express, { Express, Request, Response } from "express";
import { blogsRouter } from "./routes/blogs-router";
import { postsRouter } from "./routes/posts-router";
import { deleteAll } from "./routes/deletAll-routet";

const app: Express = express();
const port = process.env.PORT || 5005;
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
  // res.send("test");
});

app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);
app.use("/testing", deleteAll);

const start = async () => {
  await runDB();
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
};
start();
