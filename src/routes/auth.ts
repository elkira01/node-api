import { validateData } from '@infrastructure/middlewares/data-validation'

import express from 'express'
import expressAsyncHandler from 'express-async-handler'

import {
    loginSchema,
    registrationSchema,
} from '@core/auth/user-interface/validators'
import { UserController } from '@core/auth/user-interface/controllers'
import { AppSecurity, UserRepository } from '@core/auth/infrastructure'

const userController = new UserController(new UserRepository())
const securityService = new AppSecurity()

const authRouter = express.Router()

authRouter.post(
    '/register',
    validateData(registrationSchema),
    expressAsyncHandler((req, res) => userController.register(req, res))
)

authRouter.get(
    '/login',
    validateData(loginSchema),
    expressAsyncHandler((req, res) => securityService.authenticate(req, res))
)

export default authRouter
