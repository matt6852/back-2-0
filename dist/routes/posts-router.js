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
const posts_repo_1 = require("./../repo/posts-repo");
const express_1 = require("express");
const posts_middleware_1 = require("../middlewares/posts-middleware");
const auth_basic_1 = require("../application/auth-basic");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = posts_repo_1.postsRepo.getAllPosts();
    return res.send(result);
}));
exports.postsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = posts_repo_1.postsRepo.getSinglePost(id);
    return res.send(result);
}));
exports.postsRouter.post("/", auth_basic_1.authBasic, posts_middleware_1.validPost, posts_middleware_1.postInputValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = posts_repo_1.postsRepo.createPost("body");
    return res.send(result);
}));
exports.postsRouter.put("/:id", auth_basic_1.authBasic, posts_middleware_1.validPost, posts_middleware_1.postInputValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = posts_repo_1.postsRepo.updatedPost(id);
    return res.send(result);
}));
exports.postsRouter.delete("/:id", auth_basic_1.authBasic, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = posts_repo_1.postsRepo.deletedPost(id);
    return res.send(result);
}));
