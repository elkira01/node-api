import { PrismaClient } from '@infra/generated/client'

export abstract class AbstractOrmRepository {
    protected repositoryClient: PrismaClient

    constructor() {
        this.repositoryClient = new PrismaClient()
    }
}
