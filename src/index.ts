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
//@ts-ignore
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req:Request, res:Response) => {
  const d = new Date()
  res.end(d.toString())
}

const app: Express = express();
const port = process.env.PORT || 5005;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cookieParser());
app.use(allowCors);
app.use(express.json());
app.set("trust proxy", true);
app.use((req, res, next)=>{
  app.options('*', cors())
  next();
 }
);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
  // res.send("test");
});


app.use("/blogs", blogsRouter);
// app.use(
//   cors({
//     credentials: true,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     origin: ['http://localhost:3000', 'http://localhost:3030', '*'], // whatever ports you used in frontend
//   })
// )
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
