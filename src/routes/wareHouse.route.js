import express from 'express'
import wareHouseController from 'controllers/wareHouse.controller'

const router = express.Router()
router.get('/get-warehouses', wareHouseController.getAllWarehouses)
router.get('/show-warehouses', wareHouseController.showAllWarehouses)
router.post('/get-warehouse', wareHouseController.getWarehouse)
router.post('/add', wareHouseController.addWarehouse)
router.put('/update', wareHouseController.updateWarehouse)
router.post('/delete', wareHouseController.deleteWareHouses)

export default router
