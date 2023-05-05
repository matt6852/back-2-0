import { deviceRouter } from "./routes/device-router";
import "dotenv/config";
import { commentsRouter } from "./routes/comments-router";
import { runDB } from "./db/db";
import express, { Express, Request, Response } from "express";
import { blogsRouter } from "./routes/blogs-router";
import { postsRouter } from "./routes/posts-router";
import { userRouter } from "./routes/users-router";
import { deleteAll } from "./routes/deletAll-routet";
import { authRouter } from "./routes/auth-router";
import cookieParser from "cookie-parser";
import cors from "cors"

const app: Express = express();
const port = process.env.PORT || 5005;
app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", true);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
  // res.send("test");
});

app.use("/blogs", blogsRouter);
app.use(
  cors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:3000', 'http://localhost:3030'], // whatever ports you used in frontend
  })
)
app.use("/posts", postsRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/comments", commentsRouter);
app.use("/security", deviceRouter);
app.use("/testing", deleteAll);
app.use("/geo", deleteAll);

const start = async () => {
  await runDB();
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
};
start();
