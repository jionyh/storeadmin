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
exports.subCategory = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const capitalizeFirstLetter_1 = require("../utils/capitalizeFirstLetter");
const subCategorySchema = zod_1.z
    .object({
    id: zod_1.z.number().optional(),
    categoryId: zod_1.z.string().transform((i) => parseInt(i)),
    name: zod_1.z.string().toLowerCase(),
})
    .array();
exports.subCategory = {
    addSubCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = subCategorySchema.parse(req.body);
        const addSubCat = yield prisma_1.prisma.subCategory.createMany({ data });
        if (!addSubCat) {
            res.json({ sucess: false });
            return;
        }
        res.json({ sucess: true, data: addSubCat });
    }),
    getAllSubCategories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { cat } = req.query;
        if (cat) {
            const response = yield prisma_1.prisma.subCategory.findMany({
                where: {
                    categoryId: parseInt(cat),
                },
                orderBy: {
                    name: 'asc',
                },
                select: {
                    id: true,
                    name: true,
                    cat: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            const data = [];
            for (const i in response) {
                data.push({
                    id: response[i].id,
                    name: (0, capitalizeFirstLetter_1.Capitalize)(response[i].name),
                    cat: (0, capitalizeFirstLetter_1.Capitalize)(response[i].cat.name),
                });
            }
            res.json({ sucess: true, data });
            return;
        }
        const data = yield prisma_1.prisma.subCategory.findMany({
            select: {
                id: true,
                name: true,
                cat: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (!data) {
            res.json({ error: true });
            return;
        }
        res.json({ sucess: true, data });
    }),
};
