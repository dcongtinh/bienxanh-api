import express from 'express'
import orderController from 'controllers/order.controller'

const router = express.Router()
router.get('/get-orders', orderController.getAllOrders)
router.post('/get-order', orderController.getOrder)
router.post('/add', orderController.addOrder)
router.put('/update', orderController.updateOrder)
router.post('/delete', orderController.deleteOrders)

export default router
