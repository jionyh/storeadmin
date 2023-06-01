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
        const data = await prisma_1.prisma.category.findMany({ orderBy: { name: 'asc' } });
        const categories = [];
        for (const i in data) {
            categories.push({
                id: data[i].id,
                name: (0, capitalizeFirstLetter_1.Capitalize)(data[i].name),
            });
        }
        res.json({ success: true, data: categories });
    },
    editCategory: async (req, res) => {
        const { id } = req.params;
        const parse = zod_1.z
            .object({
            name: zod_1.z.string().toLowerCase().nonempty().optional(),
        })
            .safeParse(req.body);
        if (!parse.success) {
            res
                .status(400)
                .json({ success: false, message: parse.error.issues[0].message });
            return;
        }
        try {
            const editCategory = await prisma_1.prisma.category.update({
                where: { id: parseInt(id) },
                data: parse.data,
            });
            res.status(200).json({ success: true, data: editCategory });
        }
        catch (e) {
            res.json({ success: true, data: id });
        }
    },
    delCategory: async (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.json({ success: false, message: 'ID não informado!' });
            return;
        }
        try {
            const deleteCategory = await prisma_1.prisma.category.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json({ success: true, data: deleteCategory });
        }
        catch (e) {
            res.json({ success: false, message: e });
        }
    },
};
