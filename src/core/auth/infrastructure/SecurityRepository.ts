import { IUser } from '../domain/models'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

export class SecurityRepository {
    protected prismaClient: any

    constructor() {
        this.prismaClient = new PrismaClient()
    }

    async login(payload: IUser): Promise<any> {
        const data = payload
        data.password = await bcrypt.hash(data.password, 10)

        return await this.prismaClient.user.create({ data })
    }
}
