import { IUserRepository } from '../domain/repositories'

export class UserAuthService {
    private authRepo: IUserRepository

    constructor(userRepo: IUserRepository) {
        this.authRepo = userRepo
    }

    async registerUser(payload: {
        email: string
        password: any
        name: string
    }): Promise<any> {
        const existingUser = await this.authRepo.findByMail(payload.email)

        if (existingUser) {
            throw new Error('Email already exist')
        } else {
            return await this.authRepo
                .create(payload)
                .then((resp) => {
                    return resp
                })
                .catch((err) => {})
        }
    }
}
