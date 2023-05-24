"use strict";
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
    createCategory: async (req, res) => {
        const { name } = categorySchema.parse(req.body);
        const addCategory = await prisma_1.prisma.category.create({
            data: {
                name,
            },
        });
        if (!addCategory) {
            res.json({ success: false });
            return;
        }
        res.json({ success: true, data: addCategory });
    },
    getAllCategories: async (req, res) => {
        const data = await prisma_1.prisma.category.findMany();
        const categories = [];
        for (const i in data) {
            categories.push({
                id: data[i].id,
                name: (0, capitalizeFirstLetter_1.Capitalize)(data[i].name),
            });
        }
        res.json({ success: true, data: categories });
    },
};
