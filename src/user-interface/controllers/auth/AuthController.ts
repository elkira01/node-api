import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { LoginDTO } from '../../dtos/LoginDTO'
import * as process from 'node:process'
import { StatusCodes } from 'http-status-codes'
import { IUserRepository } from '../../../kernel/auth/domain/repositories'
import { UserRepository } from '../../../kernel/auth/infrastructure'
import { PrismaClient } from '../../../infrastructure/generated/client'
import { UserDTO } from '../../../kernel/auth/user-interface/dto'

export class AuthController {
    protected prismaClient: any
    private readonly userRepo: IUserRepository
    // private readonly sessionService: UserSessionService

    constructor() {
        this.prismaClient = new PrismaClient()
        this.userRepo = new UserRepository()
        // this.sessionService = new UserSessionService(
        //     new UserSessionRepository()
        // )
    }

    async authenticate(req: Request, resp: Response): Promise<any> {
        const payload = new LoginDTO(req.body).in

        try {
            const user = await this.userRepo.findByMail(payload.email)

            if (!user) {
                return resp
                    .status(401)
                    .json({ error: 'Invalid credentials', status: 401 })
            } else {
                const passwordMatch = await bcrypt.compare(
                    payload.password,
                    user.password
                )

                if (!passwordMatch)
                    return resp.status(401).json({
                        error: 'Email or password does not match',
                        status: 401,
                    })

                const accessToken = jwt.sign(
                    { email: payload.email },
                    process.env.ACCESS_TOKEN_SECRET as any,
                    {
                        expiresIn: `${parseInt(process.env.ACCESS_TOKEN_EXPIRATION as any)}s`,
                    }
                )
                const refreshToken = jwt.sign(
                    { email: payload.email },
                    process.env.REFRESH_TOKEN_SECRET as any,
                    {
                        expiresIn: `${parseInt(process.env.REFRESH_TOKEN_EXPIRATION as any)}s`,
                    }
                )

                // let session = await this.sessionService.createSession(
                //     user.id,
                //     refreshToken
                // )

                return resp
                    .status(200)
                    .json({ data: { accessToken, refreshToken }, status: 200 })
            }
        } catch (err) {
            resp.status(500).json({
                error: 'Internal server error',
                details: err,
            })
        }
    }

    async refreshToken(req: any, resp: Response): Promise<any> {
        const payload = req.user

        try {
            const user = await this.userRepo.findByMail(payload.email)

            if (!user) {
                return resp
                    .status(StatusCodes.NOT_FOUND)
                    .json({ error: 'User not found', status: 404 })
            } else {
                const accessToken = jwt.sign(
                    { email: payload.email },
                    process.env.ACCESS_TOKEN_SECRET as any,
                    {
                        expiresIn: `${parseInt(process.env.ACCESS_TOKEN_EXPIRATION as any)}s`,
                    }
                )

                return resp
                    .status(StatusCodes.OK)
                    .json({ data: { accessToken }, status: 200 })
            }
        } catch (err) {
            return resp.status(500).json({
                error: 'Internal server error',
                details: err,
            })
        }
    }

    async profile(req: any, resp: Response): Promise<any> {
        const payload = req.user

        try {
            const user = await this.userRepo.findByMail(payload.email)

            if (!user) {
                return resp
                    .status(404)
                    .json({ details: 'User not found', status: 401 })
            } else {
                return resp
                    .status(200)
                    .json({ data: new UserDTO(user).out, status: 200 })
            }
        } catch (err) {
            return resp.status(500).json({
                error: 'Internal server error',
                details: err,
            })
        }
    }
}
