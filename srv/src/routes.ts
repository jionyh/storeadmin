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

router.get('/category', category.getAllCategories)
router.post('/category', category.createCategory)
router.patch('/category/:id', category.editCategory)
router.delete('/category/:id', category.delCategory)

router.get('/product/', subCategory.getAllSubCategories)
router.post('/product/', subCategory.addSubCategory)
router.patch('/product/:id', subCategory.editSubCategory)
router.delete('/product/:id', subCategory.delSubCategory)

router.get('/compras', purchase.getPurchases)
router.post('/compras', purchase.createPurchase)
router.delete('/compras/:id', purchase.deletePurchase)
router.patch('/compras/:id', purchase.editPurchase)

router.get('/vendas', sale.getAllSales)
router.post('/vendas', sale.createSale)
router.delete('/vendas/:id', sale.deleteSale)
router.patch('/vendas/:id', sale.editSale)

router.post('/user', user.getUser)
router.post('/user/add', user.addUser)
router.patch('/user/:id', user.editUser)

router.get('/reports/sales', Auth.private, reports.getSalesValues)
router.get('/reports/purchases', Auth.private, reports.getPurchasesValues)
router.get('/reports', Auth.private, reports.getReport)

router.get('/payments', sale.getPayments)

router.get('/unit', Auth.private, unit.getAllUnit)
router.post('/unit', Auth.private, unit.getAllUnit)
router.patch('/unit/:id', Auth.private, unit.editUnit)
router.delete('/unit/:id', Auth.private, unit.deleteUnit)

export default router
