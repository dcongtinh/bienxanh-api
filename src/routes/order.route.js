import express from 'express'
import orderController from 'controllers/order.controller'

const router = express.Router()
router.get('/get-orders', orderController.getAllOrders)
router.post('/test-orders', orderController.testOrders)

router.post('/get-order', orderController.getOrder)
router.post('/add', orderController.addOrder)
router.post('/add-orders', orderController.addOrders)
router.put('/update', orderController.updateOrder)
router.put('/merge', orderController.mergeOrders)
router.put('/export', orderController.exportOrders)
router.post('/delete', orderController.deleteOrders)

export default router
