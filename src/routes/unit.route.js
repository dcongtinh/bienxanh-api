import express from 'express'
import unitController from 'controllers/unit.controller'

const router = express.Router()
router.get('/get-units', unitController.getAllUnits)
router.post('/get-unit', unitController.getUnit)
router.post('/add', unitController.addUnit)
router.put('/update', unitController.updateUnit)
router.post('/delete', unitController.deleteUnits)

export default router
