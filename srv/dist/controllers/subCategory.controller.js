"use strict";
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
    addSubCategory: async (req, res) => {
        const data = subCategorySchema.parse(req.body);
        const addSubCat = await prisma_1.prisma.subCategory.createMany({ data });
        if (!addSubCat) {
            res.json({ success: false });
            return;
        }
        res.json({ success: true, data: addSubCat });
    },
    getAllSubCategories: async (req, res) => {
        const { cat } = req.query;
        if (cat) {
            const response = await prisma_1.prisma.subCategory.findMany({
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
            res.json({ success: true, data });
            return;
        }
        const data = await prisma_1.prisma.subCategory.findMany({
            orderBy: {
                name: 'asc',
            },
            select: {
                id: true,
                name: true,
                categoryId: true,
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
        res.json({ success: true, data });
    },
    editSubCategory: async (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ success: false, error: 'id não enviado!' });
            return;
        }
        const parse = zod_1.z
            .object({
            id: zod_1.z.number().optional(),
            categoryId: zod_1.z.coerce.number().nonnegative(),
            name: zod_1.z.string().toLowerCase(),
        })
            .safeParse(req.body);
        if (!parse.success) {
            res
                .status(400)
                .json({ success: false, erro: parse.error.issues[0].message });
            return;
        }
        try {
            const updateProduct = await prisma_1.prisma.subCategory.update({
                where: { id: parseInt(id) },
                data: parse.data,
            });
            res.status(200).json({ success: true, data: updateProduct });
        }
        catch (e) {
            res.status(400).json({ success: false, error: e });
        }
    },
    delSubCategory: async (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.json({ success: false, message: 'ID não informado!' });
            return;
        }
        try {
            const deleteSubCategory = await prisma_1.prisma.subCategory.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json({ success: true, data: deleteSubCategory });
        }
        catch (e) {
            res.json({ success: false, message: e });
        }
    },
};
