"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unit = void 0;
const prisma_1 = require("../lib/prisma");
const capitalizeFirstLetter_1 = require("../utils/capitalizeFirstLetter");
exports.unit = {
    getAllUnit: async (req, res) => {
        const data = await prisma_1.prisma.unit.findMany();
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
};
