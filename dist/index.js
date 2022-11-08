"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const blogs_router_1 = require("./routes/blogs-router");
const posts_router_1 = require("./routes/posts-router");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5005;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
    // res.send("test");
});
app.use("/api-v1/blogs", blogs_router_1.blogsRouter);
app.use("/api-v1/posts", posts_router_1.postsRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
