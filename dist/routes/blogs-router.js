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
const blog_service_1 = require("./../services/blog-service");
const blogs_middleware_1 = require("./../middlewares/blogs-middleware");
const express_1 = require("express");
const auth_basic_1 = require("../application/auth-basic");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogService.getAllBlogs();
    return res.send(result);
}));
exports.blogsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield blog_service_1.blogService.getSingleBlog(id);
    if (result) {
        return res.status(200).send(result);
    }
    return res.sendStatus(404);
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
