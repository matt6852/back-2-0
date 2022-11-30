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
exports.postsRouter = void 0;
const comments_middleware_1 = require("./../middlewares/comments-middleware");
const post_service_1 = require("./../services/post-service");
const express_1 = require("express");
const posts_middleware_1 = require("../middlewares/posts-middleware");
const auth_basic_1 = require("../application/auth-basic");
const query_posts_repo_1 = require("../repo/posts/query-posts-repo");
const jwt_auth_1 = require("../application/jwt-auth");
const comments_service_1 = require("../services/comments-service");
const query_comments_repo_1 = require("../repo/comments/query-comments-repo");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        pageNumber: +req.query.pageNumber || 1,
        pageSize: +req.query.pageSize || 10,
        sortBy: req.query.sortBy || "createdAt",
        sortDirection: req.query.sortDirection || "desc",
    };
    const result = yield query_posts_repo_1.postsQueryRepo.getAllPosts(query);
    return res.send(result);
}));
exports.postsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield query_posts_repo_1.postsQueryRepo.getSinglePost(id);
    if (result) {
        return res.status(200).send(result);
    }
    return res.sendStatus(404);
}));
exports.postsRouter.post("/", auth_basic_1.authBasic, posts_middleware_1.validPost, posts_middleware_1.postInputValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.postService.createSinglePost(req.body);
    if (result)
        return res.status(201).send(result);
}));
exports.postsRouter.get("/:postId/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.postId;
    const post = yield query_posts_repo_1.postsQueryRepo.getSinglePost(id);
    console.log(post);
    if (!post)
        return res.sendStatus(404);
    const query = {
        pageNumber: +req.query.pageNumber || 1,
        pageSize: +req.query.pageSize || 10,
        sortBy: req.query.sortBy || "createdAt",
        sortDirection: req.query.sortDirection || "desc",
    };
    const result = yield query_comments_repo_1.commentsQueryRepo.getAllComments(query, id);
    return res.send(result);
}));
exports.postsRouter.post("/:postId/comments", jwt_auth_1.authJWTMiddleware, comments_middleware_1.validComment, comments_middleware_1.commentInputValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.postId;
    const result = yield query_posts_repo_1.postsQueryRepo.getSinglePost(id);
    console.log(result);
    if (!result)
        return res.sendStatus(404);
    const comment = {
        userId: req === null || req === void 0 ? void 0 : req.user.id,
        content: req.body.content,
        userLogin: req === null || req === void 0 ? void 0 : req.user.login,
        postId: result.id,
    };
    const newComment = yield comments_service_1.commentsService.createSingComment(comment);
    if (!newComment)
        return res.sendStatus(500);
    return res.status(201).send(newComment);
}));
exports.postsRouter.put("/:id", auth_basic_1.authBasic, posts_middleware_1.validPost, posts_middleware_1.postInputValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield post_service_1.postService.updateSinglePost(id, req.body);
    if (result)
        return res.sendStatus(204);
    return res.sendStatus(404);
}));
exports.postsRouter.delete("/:id", auth_basic_1.authBasic, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield post_service_1.postService.deletePost(id);
    if (result)
        return res.sendStatus(204);
    return res.sendStatus(404);
}));
