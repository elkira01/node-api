import { validateData } from '@infrastructure/middlewares/data-validation'

import express from 'express'
import expressAsyncHandler from 'express-async-handler'

import { AuthController } from '@user-interface/security/controller'
import { loginSchema } from '@user-interface/security/validators'

const securityController = new AuthController()

const authRouter = express.Router()

authRouter.get(
    '/login',
    validateData(loginSchema),
    expressAsyncHandler((req, res) => securityController.authenticate(req, res))
)

export default authRouter
