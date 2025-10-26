// import { validateData } from '@infra/middlewares/data-validation'
//
// import express from 'express'
// import expressAsyncHandler from 'express-async-handler'
//
// import { registrationSchema } from '@app/auth/user-interface/validators'
// import { UserController } from '@app/auth/user-interface/controllers'
// import { UserRepository } from '@app/auth/infrastructure'
// import { authenticateAccessToken } from '@infra/middlewares/token-validation'
//
// const userController = new UserController(new UserRepository())
//
// const authRouter = express.Router()
//
// authRouter.post(
//     '/register',
//     validateData(registrationSchema),
//     expressAsyncHandler((req, res) => userController.register(req, res))
// )
//
// authRouter.get(
//     '/user/:id',
//     authenticateAccessToken(),
//     expressAsyncHandler((req, res) => userController.details(req, res))
// )
//
// export default authRouter
