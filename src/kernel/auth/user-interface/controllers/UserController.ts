import { Request, Response } from 'express'
import { UserService } from '../../application'
import { RegistrationDTO, UserDTO } from '../dto'
import { IUserRepository } from '../../domain/repositories'

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
            res.status(500).json({ details: error.message, status: 500 })
        }
    }

    async details(req: Request, res: Response) {
        const { id } = req.params

        if (id) {
            try {
                const user = await this.userService.userDetails(id)
                res.status(200).json({ data: new UserDTO(user).out })
            } catch (err: any) {
                res.status(404).json({ details: err.message })
            }
        }
    }
}
