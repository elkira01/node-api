import { Request, Response } from 'express'
import { UserAuthService } from '../../services'
import { RegistrationDTO } from '../dto'
import { IUserRepository } from '../../domain/repositories'

export class UserAuthController {
    protected authService: UserAuthService

    constructor(authRepo: IUserRepository) {
        this.authService = new UserAuthService(authRepo)
    }

    async register(req: Request, res: Response) {
        const data = new RegistrationDTO(req.body).in

        try {
            const user = await this.authService.registerUser(data)
            res.status(201).json({
                data: new RegistrationDTO(user).out,
                status: 201,
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message, status: 500 })
        }
    }
}
