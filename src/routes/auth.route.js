import express from 'express'
import authController from 'controllers/auth.controller'
import authMiddleware from 'middlewares/auth.middleware'
import joiMiddleware from 'middlewares/joi.middleware'
import joi from '@hapi/joi'

const router = express.Router()

router.post(
    '/login',
    joiMiddleware({
        username: joi.string().required(),
        password: joi.string().required()
    }),
    authController.login
)
router.post(
    '/register',
    joiMiddleware({
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        username: joi.string().required(),
        password: joi.string().required(),
        email: joi.string().required()
    }),
    authController.register
)
router.post('/get-user', authController.getUser)
router.post(
    '/update',
    authMiddleware.isAuthenticated,
    authController.updateProfile
)
router.get('/me', authMiddleware.isAuthenticated, authController.me)

export default router
