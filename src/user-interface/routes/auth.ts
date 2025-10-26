// import { validateData } from '@infra/middlewares/data-validation'
//
// import express from 'express'
// import expressAsyncHandler from 'express-async-handler'
//
// import { AuthController } from '@ui/security/controller'
// import { loginSchema } from '@ui/security/validators'
// import {
//     authenticateAccessToken,
//     authenticateRefreshToken,
// } from '@infra/middlewares/token-validation'
//
// const securityController = new AuthController()
//
// const authRouter = express.Router()
//
// authRouter.get(
//     '/login',
//     validateData(loginSchema),
//     expressAsyncHandler((req, res) => securityController.authenticate(req, res))
// )
//
// authRouter.post(
//     '/refresh-token',
//     authenticateRefreshToken(),
//     expressAsyncHandler((req, res) => securityController.refreshToken(req, res))
// )
//
// authRouter.get(
//     '/me',
//     authenticateAccessToken(),
//     expressAsyncHandler((req, res) => securityController.profile(req, res))
// )
//
// export default authRouter
