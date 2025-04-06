import { Request, Response } from 'express'
import { UserService } from '../../services'
import { RegistrationDTO } from '@core/auth/user-interface/dto'
import { IUserRepository } from '@core/auth/domain/repositories'

export class UserController {
    protected userService: UserService

    constructor(userRepo: IUserRepository) {
        this.userService = new UserService(userRepo)
    }

    async register(req: Request, res: Response) {
        const data = new RegistrationDTO(req.body).in

        try {
            const user = await this.userService.registerUser(data)
            res.status(201).json({
                data: new RegistrationDTO(user).out,
                status: 201,
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message, status: 500 })
        }
    }
}
