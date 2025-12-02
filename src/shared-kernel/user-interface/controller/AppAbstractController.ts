import { NextFunction, Request, Response } from 'express'
import { QueryBus } from '../../infrastructure/bus/QueryBus'
import { CommandBus } from '../../infrastructure/bus/CommandBus'
import { busConfig } from '../../../infrastructure/config/bus-config'

const MAX_LIMIT = 100
const DEFAULT_LIMIT = 10
const DEFAULT_OFFSET = 1
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

    protected async handleCommand(command: any): Promise<any> {
        const commandBus = this.getCommandBus(command)
        if (!commandBus) {
            throw new Error(
                `No command handler registered for ${command.constructor.name}`
            )
        }
        return commandBus.execute(command)
    }

    protected async handleQuery(query: any): Promise<any> {
        const queryBus = this.getQueryBus(query)
        if (!queryBus) {
            throw new Error(
                `No query handler registered for ${query.constructor.name}`
            )
        }
        return queryBus.execute(query)
    }

    protected asyncHandler(
        fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
    ) {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next)
        }
    }

    protected parseCollectionQuery(query: any) {
        const page = query['page[offset]'] ?? DEFAULT_OFFSET
        const limit = query['page[limit]'] ?? DEFAULT_LIMIT

        const _filter = Object.fromEntries(
            new Map(
                Object.entries(query).filter(
                    ([key]) =>
                        key !== 'page[offset]' &&
                        key !== 'page[limit]' &&
                        key !== 'q' &&
                        key !== 'sort'
                )
            )
        )

        const _pagination = {
            page: parseInt(page),
            limit: limit > MAX_LIMIT ? MAX_LIMIT : parseInt(limit),
        }

        return {
            pagination: _pagination,
            sortOrder: query['order'],
            filter: _filter,
            search: query['q'],
        }
    }

    protected collectionResponse(data: any, total: number = 100) {
        return {
            data,
            meta: {
                total,
            },
        }
    }
}
