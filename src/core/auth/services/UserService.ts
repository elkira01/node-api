import { IUserRepository } from '../domain/repositories'
import { IUser } from '../domain/models'

export class UserService {
    private userRepo: IUserRepository

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo
    }

    async updateUser(id: any, payload: Partial<IUser>): Promise<IUser> {
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
