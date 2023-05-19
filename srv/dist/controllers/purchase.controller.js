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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = void 0;
const zod_1 = require("zod");
const dayjs_1 = __importDefault(require("dayjs"));
const prisma_1 = require("../lib/prisma");
const capitalizeFirstLetter_1 = require("../utils/capitalizeFirstLetter");
const purchaseSchema = zod_1.z
    .object({
    itemId: zod_1.z
        .string()
        .nonempty()
        .transform((i) => parseInt(i)),
    userId: zod_1.z
        .string()
        .nonempty()
        .transform((i) => parseInt(i)),
    unitId: zod_1.z
        .string()
        .nonempty()
        .transform((i) => parseInt(i)),
    quantity: zod_1.z
        .string()
        .nonempty()
        .transform((i) => parseFloat(i)),
    value: zod_1.z
        .string()
        .nonempty()
        .transform((i) => parseFloat(i)),
})
    .array();
exports.purchase = {
    createPurchase: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        const data = purchaseSchema.safeParse(req.body);
        if (data.success === false) {
            const errors = data.error.issues
                .map((item) => item.path[1])
                .map((er) => `O campo ${er} precisa ser preenchido`);
            res.json({
                status: false,
                error: errors,
            });
            return;
        }
        const parsedData = data.data;
        console.log(parsedData);
        try {
            const addPurchases = yield prisma_1.prisma.purchase.createMany({
                data: parsedData,
            });
            if (!addPurchases) {
                res.json({ success: false });
                return;
            }
            res.json({ success: true, addPurchases });
        }
        catch (e) {
            res.status(400).json({ status: false, error: e.meta.field_name });
        }
    }),
    getPurchases: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { date } = req.query;
        const purchaseList = [];
        const purchases = yield prisma_1.prisma.purchase.findMany({
            where: {
                createAt: {
                    lt: date
                        ? (0, dayjs_1.default)(date)
                            .add(1, 'day')
                            .format()
                        : undefined,
                    gt: date ? (0, dayjs_1.default)(date).format() : undefined,
                },
            },
            include: {
                unit: {
                    select: {
                        abbreviation: true,
                    },
                },
                subcategory: {
                    select: {
                        cat: {
                            select: {
                                id: true,
                            },
                        },
                        name: true,
                    },
                },
            },
        });
        const category = yield prisma_1.prisma.category.findMany();
        if (!purchases) {
            res.json({ sucess: false });
            return;
        }
        for (const i in purchases) {
            purchaseList.push({
                category: purchases[i].subcategory.cat.id,
                id: purchases[i].id,
                catId: purchases[i].subcategory.cat.id,
                name: (0, capitalizeFirstLetter_1.Capitalize)(purchases[i].subcategory.name),
                quantity: purchases[i].quantity,
                unit: purchases[i].unit.abbreviation,
                valor: purchases[i].value,
            });
        }
        const soma = purchaseList.reduce((soma, obj) => {
            return soma + obj.valor;
        }, 0);
        const result = category
            .map((el) => {
            const haveCat = purchaseList.some((item) => item.catId === el.id);
            if (haveCat) {
                return Object.assign(Object.assign({}, el), { produto: purchaseList.filter(({ catId }) => el.id === catId) });
            }
        })
            .filter((item) => item !== undefined);
        res.json({ sucess: true, data: result, total: soma });
    }),
};
