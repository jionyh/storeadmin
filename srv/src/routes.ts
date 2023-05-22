import express from 'express'
import { category } from './controllers/category.controller'
import { subCategory } from './controllers/subCategory.controller'
import { unit } from './controllers/unit.controller'
import { purchase } from './controllers/purchase.controller'
const router = express.Router()

router.post('/categories', category.createCategory)
router.get('/categories', category.getAllCategories)

router.post('/categories/sub', subCategory.addSubCategory)
router.get('/categories/sub', subCategory.getAllSubCategories)

router.post('/compras', purchase.createPurchase)
router.get('/compras', purchase.getPurchases)
router.delete('/compras/:id', purchase.deletePurchase)
router.patch('/compras/:id', purchase.editPurchase)

router.get('/unit', unit.getAllUnit)

export default router
