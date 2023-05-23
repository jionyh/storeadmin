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
exports.unit = void 0;
const prisma_1 = require("../lib/prisma");
const capitalizeFirstLetter_1 = require("../utils/capitalizeFirstLetter");
exports.unit = {
    getAllUnit: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield prisma_1.prisma.unit.findMany();
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
    }),
};
