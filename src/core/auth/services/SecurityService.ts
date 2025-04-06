import { IUserRepository } from '../domain/repositories'

export class SecurityService {
    private userRepo: IUserRepository

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo
    }

    async login(payload: { email: string; password: string }): Promise<any> {
        const user = await this.userRepo.findByMail(payload.email)
        //
        // if (!user?.id) {
        //     throw new Error("Email and password don't match")
        // } else {
        //     return this.authRepo.login(payload)
        // }
    }
}
