import { validateData } from '@infrastructure/middlewares/validation'

import express from 'express'
import expressAsyncHandler from 'express-async-handler'

import { registrationSchema } from '@core/auth/user-interface/validators'
import { UserRepository } from '@core/auth/infrastructure/orm/UserRepository'
import { AuthController } from '@core/auth/user-interface/controllers'

const authRouter = express.Router()

const dataRepo = new UserRepository()
const controller = new AuthController(dataRepo)

authRouter.post(
    '/register',
    validateData(registrationSchema),
    expressAsyncHandler((req, res) => controller.register(req, res))
)

export { authRouter }
