import { DependencyContainer } from '@shared/infrastructure/DependencyContainer'

export class QueryBus {
    private handlers: Map<any, any>

    constructor(private injectionContainer: DependencyContainer) {
        this.handlers = new Map()
    }

    getNames() {
        const _names: string[] = []

        this.handlers.forEach((_, key) => _names.push(key))

        return _names
    }

    register(
        queryName: string,
        handler: new (...deps: any[]) => { handle(query: any): Promise<any> },
        deps: string[] = []
    ) {
        this.handlers.set(queryName, { handler: handler, deps: deps })
    }

    async execute(query: any) {
        const handler = this.handlers.get(query.constructor.name)

        if (!handler) {
            throw new Error(
                `No handler registered for ${query.constructor.name}`
            )
        }

        const deps = handler.deps.map((dep: string) =>
            this.injectionContainer.get(dep)
        )
        const handlerInstance = new handler.handler(...deps)

        return await handlerInstance.handle(query)
    }
}
