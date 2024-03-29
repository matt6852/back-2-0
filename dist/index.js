"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_router_1 = require("./routes/device-router");
require("dotenv/config");
const comments_router_1 = require("./routes/comments-router");
const db_1 = require("./db/db");
const express_1 = __importDefault(require("express"));
const blogs_router_1 = require("./routes/blogs-router");
const posts_router_1 = require("./routes/posts-router");
const users_router_1 = require("./routes/users-router");
const deletAll_routet_1 = require("./routes/deletAll-routet");
const auth_router_1 = require("./routes/auth-router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5005;
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.set("trust proxy", true);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
    // res.send("test");
});
app.use("/blogs", blogs_router_1.blogsRouter);
app.use("/posts", posts_router_1.postsRouter);
app.use("/users", users_router_1.userRouter);
app.use("/auth", auth_router_1.authRouter);
app.use("/comments", comments_router_1.commentsRouter);
app.use("/security", device_router_1.deviceRouter);
app.use("/testing", deletAll_routet_1.deleteAll);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDB)();
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
start();
