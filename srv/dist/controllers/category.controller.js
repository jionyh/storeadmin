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
exports.category = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const capitalizeFirstLetter_1 = require("../utils/capitalizeFirstLetter");
const categorySchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string(),
});
exports.category = {
    createCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = categorySchema.parse(req.body);
        const addCategory = yield prisma_1.prisma.category.create({
            data: {
                name,
            },
        });
        if (!addCategory) {
            res.json({ success: false });
            return;
        }
        res.json({ success: true, data: addCategory });
    }),
    getAllCategories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield prisma_1.prisma.category.findMany();
        const categories = [];
        for (const i in data) {
            categories.push({
                id: data[i].id,
                name: (0, capitalizeFirstLetter_1.Capitalize)(data[i].name),
            });
        }
        res.json({ success: true, data: categories });
    }),
};
