import { IUserRepository } from '../domain/repositories'
import { IUser } from '../domain/entities'

export class UserService {
    private userRepo: IUserRepository

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo
    }

    async registerUser(payload: {
        email: string
        password: any
        name: string
    }): Promise<any> {
        const existingUser = await this.userRepo.findByMail(payload.email)

        if (existingUser) {
            throw new Error('Email already exist')
        } else {
            return await this.userRepo.create(payload)
        }
    }

    async updateUser(id: any, payload: Partial<IUser>): Promise<IUser> {
        return this.userRepo.update(id, payload)
    }

    async changeUserPassword(id: any, payload: Partial<IUser>): Promise<IUser> {
        return this.userRepo.update(id, payload)
    }

    async deleteUser(id: any): Promise<void> {
        await this.userRepo.delete(id)
    }

    async getUserById(id: any): Promise<IUser | null> {
        return this.userRepo.findById(id)
    }

    async userCollection(): Promise<IUser[]> {
        return this.userRepo.getAll()
    }
}
