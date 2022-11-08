"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const blogs_repo_1 = require("./../repo/blogs-repo");
const express_1 = require("express");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get("/", (req, res) => {
    const result = blogs_repo_1.blogsRepo.getAllBlogs();
    return res.send(result);
});
exports.blogsRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const result = blogs_repo_1.blogsRepo.getSingleBlog(id);
    return res.send(result);
});
exports.blogsRouter.post("/", (req, res) => {
    const result = blogs_repo_1.blogsRepo.createBlog("body");
    return res.send(result);
});
exports.blogsRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const result = blogs_repo_1.blogsRepo.updatedBlog(id);
    return res.send(result);
});
exports.blogsRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    const result = blogs_repo_1.blogsRepo.deletedBlog(id);
    return res.send(result);
});
