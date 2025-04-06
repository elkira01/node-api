import { IUser } from '../entities'

export interface IUserRepository {
    create(payload: Partial<IUser>): Promise<any>
    update(id: any, payload: Partial<IUser>): Promise<any>
    delete(id: any): Promise<void>
    findById(id: any): Promise<IUser | null>
    findByMail(emailAddr: string): Promise<IUser | null>
    getAll(): Promise<IUser[]>
}
