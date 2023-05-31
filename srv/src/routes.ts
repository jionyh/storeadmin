import express from 'express'
import { category } from './controllers/category.controller'
import { subCategory } from './controllers/subCategory.controller'
import { unit } from './controllers/unit.controller'
import { purchase } from './controllers/purchase.controller'
import { sale } from './controllers/sale.controller'
import { Auth } from './middlewares/auth'
import { auth } from './controllers/auth.controller'
import { user } from './controllers/user.controller'
import { reports } from './controllers/reports.controller'
const router = express.Router()

router.post('/signin', auth.signin)
router.post('/signup', auth.signup)
router.post('/logout', auth.logout)

router.post('/categories', category.createCategory)
router.get('/categories', category.getAllCategories)
router.patch('/category/:id', category.editCategory)
router.delete('/category/:id', category.delCategory)

router.post('/categories/sub', subCategory.addSubCategory)
router.get('/categories/sub', subCategory.getAllSubCategories)
router.patch('/product/:id', subCategory.editSubCategory)
router.delete('/product/:id', subCategory.delSubCategory)

router.post('/compras', purchase.createPurchase)
router.get('/compras', purchase.getPurchases)
router.delete('/compras/:id', purchase.deletePurchase)
router.patch('/compras/:id', purchase.editPurchase)

router.get('/vendas', sale.getAllSales)
router.post('/vendas', sale.createSale)
router.delete('/vendas/:id', sale.deleteSale)
router.patch('/vendas/:id', sale.editSale)

router.post('/user', user.getUser)

router.get('/reports/sales', Auth.private, reports.getSalesValues)
router.get('/reports/purchases', Auth.private, reports.getPurchasesValues)
router.get('/reports', Auth.private, reports.getReport)

router.get('/payments', sale.getPayments)

router.get('/unit', Auth.private, unit.getAllUnit)
router.patch('/unit/:id', Auth.private, unit.editUnit)
router.delete('/unit/:id', Auth.private, unit.deleteUnit)

export default router
