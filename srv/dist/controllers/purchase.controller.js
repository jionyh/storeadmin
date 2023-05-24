"use strict";
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
    supplier: zod_1.z.string().transform((i) => (i === '' ? '---' : i)),
})
    .array();
exports.purchase = {
    createPurchase: async (req, res) => {
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
        try {
            const addPurchases = await prisma_1.prisma.purchase.createMany({
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
    },
    getPurchases: async (req, res) => {
        const { date } = req.query;
        const purchaseList = [];
        const purchases = await prisma_1.prisma.purchase.findMany({
            where: {
                createAt: {
                    gte: date
                        ? (0, dayjs_1.default)(date)
                            .startOf('day')
                            .toDate()
                        : undefined,
                    lte: date
                        ? (0, dayjs_1.default)(date)
                            .endOf('day')
                            .toDate()
                        : undefined,
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
        const category = await prisma_1.prisma.category.findMany();
        if (!purchases) {
            res.json({ success: false });
            return;
        }
        for (const i in purchases) {
            purchaseList.push({
                id: purchases[i].id,
                catId: purchases[i].subcategory.cat.id,
                name: (0, capitalizeFirstLetter_1.Capitalize)(purchases[i].subcategory.name),
                quantity: purchases[i].quantity.toString(),
                unit: purchases[i].unit.abbreviation,
                value: purchases[i].value.toFixed(2).toString(),
                supplier: (0, capitalizeFirstLetter_1.Capitalize)(purchases[i].supplier) || '',
            });
        }
        const soma = purchaseList.reduce((soma, obj) => {
            return soma + parseFloat(obj.value);
        }, 0);
        const result = category
            .map((el) => {
            const haveCat = purchaseList.some((item) => item.catId === el.id);
            if (haveCat) {
                return {
                    ...el,
                    produto: purchaseList.filter(({ catId }) => el.id === catId),
                };
            }
        })
            .filter((item) => item !== undefined);
        res.json({ success: true, data: result, total: soma.toFixed(2) });
    },
    deletePurchase: async (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ success: false, error: 'id não enviado!' });
            return;
        }
        const deletedPurchase = await prisma_1.prisma.purchase.delete({
            where: { id: parseInt(id) },
        });
        if (!deletedPurchase) {
            res.status(400).json({ success: false, error: 'Compra não localizada!' });
            return;
        }
        res.status(200).json({
            success: true,
        });
    },
    editPurchase: async (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ success: false, error: 'id não enviado!' });
            return;
        }
        const parse = zod_1.z
            .object({
            value: zod_1.z.coerce
                .number({
                required_error: 'Valor não enviado!',
                invalid_type_error: 'Valor não enviado',
            })
                .nonnegative({ message: 'O valor não pode ser negativo!' })
                .optional(),
            quantity: zod_1.z.coerce
                .number({
                required_error: 'Quantidade não enviada!',
                invalid_type_error: 'Quantidade não enviada',
            })
                .nonnegative({ message: 'A quantidade não pode ser negativa!' })
                .optional(),
        })
            .safeParse(req.body);
        if (!parse.success) {
            res
                .status(400)
                .json({ success: false, erro: parse.error.issues[0].message });
            return;
        }
        try {
            const updatedPurchase = await prisma_1.prisma.purchase.update({
                where: { id: parseInt(id) },
                data: parse.data,
            });
            res.status(200).json({ success: true, data: updatedPurchase });
        }
        catch (e) {
            res.status(400).json({ success: false, data: e });
        }
    },
};
