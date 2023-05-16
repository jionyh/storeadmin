"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./controllers/category.controller");
const subCategory_controller_1 = require("./controllers/subCategory.controller");
const unit_controler_1 = require("./controllers/unit.controler");
const router = express_1.default.Router();
router.post('/categories', category_controller_1.category.createCategory);
router.get('/categories', category_controller_1.category.getAllCategories);
router.post('/categories/sub', subCategory_controller_1.subCategory.addSubCategory);
router.get('/categories/sub', subCategory_controller_1.subCategory.getAllSubCategories);
router.get('/unit', unit_controler_1.unit.getAllUnit);
exports.default = router;
