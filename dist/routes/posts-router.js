"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const posts_repo_1 = require("./../repo/posts-repo");
const express_1 = require("express");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get("/", (req, res) => {
    const result = posts_repo_1.postsRepo.getAllPosts();
    return res.send(result);
});
exports.postsRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const result = posts_repo_1.postsRepo.getSinglePost(id);
    return res.send(result);
});
exports.postsRouter.post("/", (req, res) => {
    const result = posts_repo_1.postsRepo.createPost("body");
    return res.send(result);
});
exports.postsRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const result = posts_repo_1.postsRepo.updatedPost(id);
    return res.send(result);
});
exports.postsRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    const result = posts_repo_1.postsRepo.deletedPost(id);
    return res.send(result);
});
