import { PrismaClient as ODMClient } from '@prisma/client'

export class ODMPrismaClient {
    protected client: ODMClient

    constructor() {
        this.client = new ODMClient()
    }
}
