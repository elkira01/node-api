import { Request, Response } from 'express'
import { SecurityService } from '../../services'
import { RegistrationDTO } from '../dto'
import { IUserRepository } from '../../domain/repositories'

export class AuthController {
    protected authService: SecurityService

    constructor(userRepo: IUserRepository) {
        this.authService = new SecurityService(userRepo)
    }

    async login(req: Request, res: Response) {
        const data = new RegistrationDTO(req.body).in

        try {
            const user = await this.authService.login(data)
            res.status(201).json({
                data: new RegistrationDTO(user).out,
                status: 201,
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message, status: 500 })
        }
    }
}
