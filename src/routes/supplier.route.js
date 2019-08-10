import express from 'express'
import supplierController from 'controllers/supplier.controller.js'

const router = express.Router()
router.get('/get-suppliers', supplierController.getAllSuppliers)
router.post('/get-supplier', supplierController.getSupplier)
router.post('/add', supplierController.addSupplier)
router.put('/update', supplierController.updateSupplier)
router.post('/delete', supplierController.deleteSuppliers)

export default router
