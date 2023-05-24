import express from 'express'
import { category } from './controllers/category.controller'
import { subCategory } from './controllers/subCategory.controller'
import { unit } from './controllers/unit.controller'
import { purchase } from './controllers/purchase.controller'
import { sale } from './controllers/sale.controller'
import { Auth } from './middlewares/auth'
import { auth } from './controllers/auth.controller'
const router = express.Router()

router.post('/signin', auth.signin)
router.post('/signup', auth.signup)
router.post('/logout', auth.logout)

router.post('/categories', category.createCategory)
router.get('/categories', category.getAllCategories)

router.post('/categories/sub', subCategory.addSubCategory)
router.get('/categories/sub', subCategory.getAllSubCategories)

router.post('/compras', purchase.createPurchase)
router.get('/compras', purchase.getPurchases)
router.delete('/compras/:id', purchase.deletePurchase)
router.patch('/compras/:id', purchase.editPurchase)

router.get('/vendas', sale.getAllSales)
router.post('/vendas', sale.createSale)
router.delete('/vendas/:id', sale.deleteSale)
router.patch('/vendas/:id', sale.editSale)

router.get('/payments', sale.getPayments)

router.get('/unit', Auth.private, unit.getAllUnit)

export default router
