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
const post_service_1 = require("./../services/post-service");
const express_1 = require("express");
const posts_middleware_1 = require("../middlewares/posts-middleware");
const auth_basic_1 = require("../application/auth-basic");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.postService.getAllPosts();
    return res.send(result);
}));
exports.postsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield post_service_1.postService.getSinglePost(id);
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
exports.postsRouter.put("/:id", auth_basic_1.authBasic, posts_middleware_1.validPost, posts_middleware_1.postInputValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield post_service_1.postService.updateSinglePost(id, req.body);
    if (result)
        return res.sendStatus(204);
    return res.sendStatus(404);
}));
exports.postsRouter.delete("/:id", auth_basic_1.authBasic, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield post_service_1.postService.deleteBlog(id);
    if (result)
        return res.sendStatus(204);
    return res.sendStatus(404);
}));
