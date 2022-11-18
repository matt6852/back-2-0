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
const blogModel_1 = require("./../models/blogModel");
const blogs_middleware_1 = require("./../middlewares/blogs-middleware");
const blogs_repo_1 = require("./../repo/blogs-repo");
const express_1 = require("express");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogModel_1.BlogModel.find({}).lean();
    return res.send(result);
}));
exports.blogsRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const result = blogs_repo_1.blogsRepo.getSingleBlog(id);
    return res.send(result);
});
exports.blogsRouter.post("/", blogs_middleware_1.validBlog, blogs_middleware_1.blogsInputValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield blogModel_1.BlogModel.create({ name: "Jean-Luc Picard", url: "test URl" });
    // const result = blogsRepo.createBlog("body");
    return res.send("test");
}));
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
