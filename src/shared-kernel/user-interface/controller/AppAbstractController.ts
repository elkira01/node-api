import { busConfig } from '@infra/dependencies/bus-config'
import { CommandBus } from '@shared/infrastructure/bus/CommandBus'
import { QueryBus } from '@shared/infrastructure/bus/QueryBus'
import { Request, Response, NextFunction } from 'express'

export abstract class AppAbstractController {
    private commandBus: CommandBus[]
    private queryBus: QueryBus[]

    constructor() {
        this.commandBus = Object.values(busConfig).map((conf) => conf.command)
        this.queryBus = Object.values(busConfig).map((conf) => conf.query)
    }

    private getCommandBus(command: any) {
        const commandName = command.constructor.name
        return this.commandBus.find((bus) =>
            bus.getNames().includes(commandName)
        )
    }

    private getQueryBus(query: any) {
        const queryName = query.constructor.name
        return this.queryBus.find((bus) => bus.getNames().includes(queryName))
    }

    async handleCommand(command: any): Promise<any> {
        return this.getCommandBus(command)?.execute(command)
    }

    async handleQuery(command: any): Promise<any> {
        return this.getQueryBus(command)?.execute(command)
    }

    protected asyncHandler(
        fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
    ) {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next)
        }
    }
}
