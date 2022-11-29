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
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const post_service_1 = require("./../services/post-service");
const posts_middleware_1 = require("./../middlewares/posts-middleware");
const blogs_repo_1 = require("./../repo/blogs-repo");
const query_blogs_repo_1 = require("./../repo/query-blogs-repo");
const blog_service_1 = require("./../services/blog-service");
const blogs_middleware_1 = require("./../middlewares/blogs-middleware");
const express_1 = require("express");
const auth_basic_1 = require("../application/auth-basic");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        searchNameTerm: req.query.searchNameTerm || null,
        pageNumber: +req.query.pageNumber || 1,
        pageSize: +req.query.pageSize || 10,
        sortBy: req.query.sortBy || "createdAt",
        sortDirection: req.query.sortDirection || "desc",
    };
    const result = yield query_blogs_repo_1.blogsQueryRepo.getAllBlogs(query);
    return res.send(result);
}));
exports.blogsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield query_blogs_repo_1.blogsQueryRepo.getSingleBlog(id);
    if (result) {
        return res.status(200).send(result);
    }
    return res.sendStatus(404);
}));
exports.blogsRouter.get("/:id/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield blogs_repo_1.blogsRepo.getSingleBlog(id);
    if (!result)
        return res.sendStatus(404);
    const query = {
        pageNumber: +req.query.pageNumber || 1,
        pageSize: +req.query.pageSize || 10,
        sortBy: req.query.sortBy || "createdAt",
        sortDirection: req.query.sortDirection || "desc",
    };
    const allPostsForSingleBlog = yield query_blogs_repo_1.blogsQueryRepo.getAllPostsForSingleBlog(query, id);
    res.send(allPostsForSingleBlog);
}));
exports.blogsRouter.post("/:id/posts", auth_basic_1.authBasic, posts_middleware_1.validPostWithOutID, posts_middleware_1.postInputValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const exists = yield blogs_repo_1.blogsRepo.getSingleBlog(id);
    if (!exists)
        return res.sendStatus(404);
    req.body.blogId = id;
    const result = yield post_service_1.postService.createSinglePost(req.body);
    if (result)
        return res.status(201).send(result);
}));
exports.blogsRouter.post("/", auth_basic_1.authBasic, blogs_middleware_1.validBlog, blogs_middleware_1.blogsInputValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogService.createBlog(req.body);
    if (result)
        return res.status(201).send(result);
}));
exports.blogsRouter.put("/:id", auth_basic_1.authBasic, blogs_middleware_1.validBlog, blogs_middleware_1.blogsInputValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield blog_service_1.blogService.updateBlog(id, req.body);
    if (result)
        return res.sendStatus(204);
    return res.sendStatus(404);
}));
exports.blogsRouter.delete("/:id", auth_basic_1.authBasic, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield blog_service_1.blogService.deleteBlog(id);
    if (result)
        return res.sendStatus(204);
    return res.sendStatus(404);
}));
