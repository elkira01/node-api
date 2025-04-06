import { validateData } from '@infrastructure/middlewares/data-validation'

import express from 'express'
import expressAsyncHandler from 'express-async-handler'

import {
    loginSchema,
    registrationSchema,
} from '@core/auth/user-interface/validators'
import { UserController } from '@core/auth/user-interface/controllers'
import { UserRepository } from '@core/auth/infrastructure'

const userController = new UserController(new UserRepository())

const authRouter = express.Router()

authRouter.post(
    '/register',
    validateData(registrationSchema),
    expressAsyncHandler((req, res) => userController.register(req, res))
)

authRouter.get('/login', validateData(loginSchema))

export default authRouter
