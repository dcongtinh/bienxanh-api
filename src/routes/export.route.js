import express from 'express'
import exportController from 'controllers/export.controller'

const router = express.Router()
router.get('/get-exports', exportController.getAllExports)
router.post('/get-export', exportController.getExport)

export default router
