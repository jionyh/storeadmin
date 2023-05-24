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
exports.sale = void 0;
const zod_1 = require("zod");
const dayjs_1 = __importDefault(require("dayjs"));
const prisma_1 = require("../lib/prisma");
exports.sale = {
    getAllSales: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { date } = req.query;
        console.log('iniciou o get');
        try {
            const sales = yield prisma_1.prisma.sale.findMany({
                orderBy: { id: 'asc' },
                include: { paymentsMethods: true },
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
            });
            const formatReturn = [];
            sales.forEach((item) => {
                // Constante que retorna o primeiro index que satisfazer a condição de data.
                // Retorna -1 se já achou ou não bateu a condição
                const existingDayIndex = formatReturn.findIndex((entry) => {
                    const d = (0, dayjs_1.default)(item.createAt).format('YYYY-MM-DD');
                    return entry.day === d;
                });
                // Se já existe o dia, adiciona apenas os campos de data ao dia
                if (existingDayIndex !== -1) {
                    // faz a soma e adiciona ao dia o total de vendas se já existe um índice
                    formatReturn[existingDayIndex].total = (parseFloat(formatReturn[existingDayIndex].total) + item.value).toFixed(2);
                    formatReturn[existingDayIndex].data.push({
                        id: item.id,
                        value: item.value.toFixed(2),
                        payment: item.paymentsMethods.name,
                    });
                    // Senão existe o dia, então adiciona o dia, o total  e a data dele
                }
                else {
                    formatReturn.push({
                        day: (0, dayjs_1.default)(item.createAt).format('YYYY-MM-DD'),
                        total: item.value.toFixed(2),
                        data: [
                            {
                                id: item.id,
                                value: item.value.toFixed(2),
                                payment: item.paymentsMethods.name,
                            },
                        ],
                    });
                }
            });
            res.status(200).json({
                success: true,
                data: formatReturn,
            });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ success: false, message: e });
        }
    }),
    createSale: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const parse = zod_1.z
            .object({
            value: zod_1.z
                .string()
                .nonempty()
                .transform((number) => parseFloat(number.replace(',', '.'))),
            paymentId: zod_1.z.coerce.number().gt(0),
        })
            .array()
            .safeParse(req.body);
        if (!parse.success) {
            res
                .status(400)
                .json({ success: false, message: parse.error.issues[0].message });
            return;
        }
        try {
            const addSale = yield prisma_1.prisma.sale.createMany({ data: parse.data });
            res.status(200).json({ success: true, data: addSale });
        }
        catch (e) {
            res.status(400).json({ success: false, message: e });
        }
    }),
    deleteSale: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ success: false, error: 'id não enviado!' });
            return;
        }
        try {
            yield prisma_1.prisma.sale.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json({
                success: true,
            });
        }
        catch (e) {
            res.status(400).json({ success: false, error: 'Venda não localizada!' });
        }
    }),
    editSale: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        })
            .safeParse(req.body);
        if (!parse.success) {
            res
                .status(400)
                .json({ success: false, erro: parse.error.issues[0].message });
            return;
        }
        try {
            const updatedPurchase = yield prisma_1.prisma.sale.update({
                where: { id: parseInt(id) },
                data: parse.data,
            });
            res.status(200).json({ success: true, data: updatedPurchase });
        }
        catch (e) {
            res.status(400).json({ success: false, error: e });
        }
    }),
    getPayments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const payments = yield prisma_1.prisma.paymentsMethods.findMany();
        res.json({ success: true, data: payments });
    }),
};