import express from 'express'
import { category } from './controllers/category.controller'
import { subCategory } from './controllers/subCategory.controller'
import { unit } from './controllers/unit.controler'
const router = express.Router()


router.post('/categories', category.createCategory)
router.get('/categories', category.getAllCategories)

router.post('/categories/sub', subCategory.addSubCategory)
router.get('/categories/sub', subCategory.getAllSubCategories)

router.get('/unit',unit.getAllUnit)


export default router