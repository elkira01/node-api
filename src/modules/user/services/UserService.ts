import {IUserRepository} from "../core/repositories/IUserRepository";
import {IUser} from "../core/models/IUser";

export class UserService {
    private userRepo: IUserRepository

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async createUser(data: IUser): Promise<IUser> {
        return this.userRepo.create(data);
    }

    async updateUser(id: any, data: Partial<IUser>): Promise<IUser> {
        return this.userRepo.update(id, data);
    }

    async deleteUser(id: any): Promise<void> {
        await this.userRepo.delete(id);
    }

    async getUserById(id: any): Promise<IUser|null> {
        return this.userRepo.findById(id);
    }

    async getAllUsers(): Promise<IUser[]> {
        return this.userRepo.findAll();
    }

}