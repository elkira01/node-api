import {IUser} from "../models/IUser";

export interface IUserRepository {
    create(data: IUser): Promise<any>
    update(id: any, data: Partial<IUser>): Promise<any>
    delete(id: any): Promise<void>
    findById(id: any): Promise<IUser|null>
    findAll(): Promise<IUser[]>
}