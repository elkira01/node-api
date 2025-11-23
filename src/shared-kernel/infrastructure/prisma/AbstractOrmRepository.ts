import { Prisma, PrismaClient } from '../../../infrastructure/generated/client'

export abstract class AbstractOrmRepository {
    protected entityManager: PrismaClient
    protected queryBuilder = Prisma

    constructor() {
        this.entityManager = new PrismaClient()
    }
}
