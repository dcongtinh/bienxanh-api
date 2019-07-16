import express from 'express'
import itemController from 'controllers/item.controller'

const router = express.Router()
router.get('/get-items', itemController.getAllItems)
router.post('/get-item', itemController.getItem)
router.post('/add', itemController.addItem)
router.put('/update', itemController.updateItem)
router.post('/delete', itemController.deleteItems)

export default router
