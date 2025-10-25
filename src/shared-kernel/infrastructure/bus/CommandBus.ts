import { DependencyContainer } from '@shared/infrastructure/DependencyContainer'

export class CommandBus {
    private handlers: Map<string, any>

    constructor(private injectionContainer: DependencyContainer) {
        this.handlers = new Map()
    }

    getNames() {
        const _names: string[] = []

        this.handlers.forEach((_, key) => _names.push(key))

        return _names
    }

    register(
        commandName: string,
        handler: new (...deps: any[]) => { handle(query: any): Promise<any> },
        deps: string[] = []
    ) {
        this.handlers.set(commandName, { handler: handler, deps: deps })
    }

    async execute(command: any) {
        const handler = this.handlers.get(command.constructor.name)

        if (!handler) {
            throw new Error(
                `No handler registered for ${command.constructor.name}`
            )
        }

        const deps = handler.deps.map((dep: string) =>
            this.injectionContainer.get(dep)
        )
        const handlerInstance = new handler.handler(deps)

        return await handlerInstance.handle(command)
    }
}
