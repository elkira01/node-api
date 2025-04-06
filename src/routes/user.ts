import { validateData } from '@infrastructure/middlewares/data-validation'

import express from 'express'
import expressAsyncHandler from 'express-async-handler'

import { registrationSchema } from '@core/auth/user-interface/validators'
import { UserController } from '@core/auth/user-interface/controllers'
import { UserRepository } from '@core/auth/infrastructure'
import { authenticateToken } from '@infrastructure/middlewares/token-validation'

const userController = new UserController(new UserRepository())

const authRouter = express.Router()

authRouter.post(
    '/register',
    validateData(registrationSchema),
    expressAsyncHandler((req, res) => userController.register(req, res))
)

authRouter.get(
    '/user/:id',
    authenticateToken(),
    expressAsyncHandler((req, res) => userController.details(req, res))
)

export default authRouter
