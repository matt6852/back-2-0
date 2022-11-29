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
exports.postsRepo = void 0;
const postModel_1 = require("../models/postModel");
exports.postsRepo = {
    createPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postModel_1.PostModel.create(data);
            if (result)
                return result;
        });
    },
    updateSinglePost(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield postModel_1.PostModel.findByIdAndUpdate(id, data);
                return result;
            }
            catch (error) {
                return null;
            }
        });
    },
    deletedPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield postModel_1.PostModel.findByIdAndDelete(id);
                return result;
            }
            catch (error) {
                return null;
            }
        });
    },
};
