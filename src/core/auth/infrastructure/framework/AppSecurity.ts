import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { LoginDTO } from '@core/auth/user-interface/dto'
import { Request, Response } from 'express'
import { IUserRepository } from '@core/auth/domain/repositories'
import { UserRepository } from '@core/auth/infrastructure'

export class AppSecurity {
    protected prismaClient: any
    private readonly userRepo: IUserRepository

    constructor() {
        this.prismaClient = new PrismaClient()
        this.userRepo = new UserRepository()
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
                    process.env.ACCESS_TOKEN_SECRET as any
                )
                return resp
                    .status(200)
                    .json({ data: { accessToken }, status: 200 })
            }
        } catch (err) {
            resp.status(500).json({
                error: 'Internal server error',
                details: err,
            })
        }
    }
}
