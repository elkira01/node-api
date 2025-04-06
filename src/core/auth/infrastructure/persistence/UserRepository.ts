import { IUserRepository } from '../../domain/repositories'
import { IUser } from '../../domain/entities'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

export class UserRepository implements IUserRepository {
    protected prismaClient: any

    constructor() {
        this.prismaClient = new PrismaClient()
    }

    async create(payload: IUser): Promise<any> {
        const data = payload
        data.password = await bcrypt.hash(data.password, 10)

        return await this.prismaClient.user.create({ data })
    }

    async update(id: any, payload: IUser): Promise<any> {
        return this.prismaClient.user.update({
            where: {
                id,
            },
            payload,
        })
    }

    async delete(id: any): Promise<void> {
        return this.prismaClient.user.delete({
            where: {
                id,
            },
        })
    }

    async getAll(): Promise<IUser[]> {
        return this.prismaClient.user.findMany()
    }

    async findById(id: any): Promise<IUser | null> {
        return this.prismaClient.user.findUnique({
            where: {
                id,
            },
        })
    }

    async findByMail(emailAddr: string): Promise<IUser | null> {
        return this.prismaClient.user.findUnique({
            where: {
                email: emailAddr,
            },
        })
    }
}
