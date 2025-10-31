import { IUserSessionRepository } from '../../domain/repositories'
import { IUserSession } from '../../domain/entities'
import { PrismaClient } from '../../../../infrastructure/generated/client'

export class UserSessionRepository implements IUserSessionRepository {
    private prismaClient: any

    constructor() {
        this.prismaClient = new PrismaClient()
    }

    async findByToken(payload: any): Promise<IUserSession | null> {
        return this.prismaClient.userSession.findUnique({
            where: {
                refreshToken: payload,
            },
        })
    }

    async save(payload: Partial<IUserSession>): Promise<any> {
        const data = payload

        return this.prismaClient.userSession.create({ data })
    }
}
