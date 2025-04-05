import { IUserRepository } from '../../domain/repositories'
import { IUser } from '../../domain/models'
import { PrismaClient } from '@prisma/client'

export class UserRepository implements IUserRepository {
    protected prismaClient: any

    constructor() {
        this.prismaClient = new PrismaClient()
    }

    create(data: Partial<IUser>): Promise<any> {
        return this.prismaClient.user.create({ data })
    }

    update(id: any, data: Partial<IUser>): Promise<any> {
        return this.prismaClient.user.update({
            where: {
                id,
            },
            data,
        })
    }

    delete(id: any): Promise<void> {
        return this.prismaClient.user.delete({
            where: {
                id,
            },
        })
    }

    getAll(): Promise<IUser[]> {
        return this.prismaClient.user.findMany()
    }

    findById(id: any): Promise<IUser | null> {
        return this.prismaClient.user.findUnique({
            where: {
                id,
            },
        })
    }

    findByMail(emailAddr: string): Promise<IUser | null> {
        return this.prismaClient.user.findUnique({
            where: {
                emailAddr,
            },
        })
    }
}
