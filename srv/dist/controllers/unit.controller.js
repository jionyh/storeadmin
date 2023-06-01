"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unit = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const capitalizeFirstLetter_1 = require("../utils/capitalizeFirstLetter");
exports.unit = {
    getAllUnit: async (req, res) => {
        const data = await prisma_1.prisma.unit.findMany({ orderBy: { name: 'asc' } });
        if (!data) {
            res.json({ success: false });
            return;
        }
        const units = [];
        for (const i in data) {
            units.push({
                id: data[i].id,
                name: (0, capitalizeFirstLetter_1.Capitalize)(data[i].name),
                abbreviation: data[i].abbreviation.toUpperCase(),
            });
        }
        res.json({ success: true, data: units });
    },
    editUnit: async (req, res) => {
        const { id } = req.params;
        const parse = zod_1.z
            .object({
            name: zod_1.z.string().toLowerCase().nonempty().optional(),
            abbreviation: zod_1.z.string().toLowerCase().nonempty().optional(),
        })
            .safeParse(req.body);
        if (!parse.success) {
            res
                .status(400)
                .json({ success: false, message: parse.error.issues[0].message });
            return;
        }
        try {
            const editUnit = await prisma_1.prisma.unit.update({
                where: { id: parseInt(id) },
                data: parse.data,
            });
            res.status(200).json({ success: true, data: editUnit });
        }
        catch (e) {
            res.json({ success: true, data: id });
        }
    },
    deleteUnit: async (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.json({ success: false, message: 'ID não informado!' });
            return;
        }
        try {
            const deleteUnit = await prisma_1.prisma.unit.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json({ success: true, data: deleteUnit });
        }
        catch (e) {
            res.json({ success: false, message: e });
        }
    },
};
