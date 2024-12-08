import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import {UserController} from "../controllers/UserController";

const userRouter = express.Router()
const controller = new UserController()

userRouter.post(
    '/create',
    expressAsyncHandler((req, res) =>
        controller.create(req, res)
    )
)