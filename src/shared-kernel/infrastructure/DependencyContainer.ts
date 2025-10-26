export class DependencyContainer {
    private _services: Map<any, any>
    private _singletons: Map<any, any>
    constructor() {
        this._services = new Map()
        this._singletons = new Map()
    }

    register(depName: string, definition: any, options: any = {}) {
        this._services.set(depName, { definition, options })
    }

    bind(interfaceName: string, implementation: any, options = {}) {
        this._services.set(interfaceName, {
            definition: implementation,
            options,
        })
    }

    get(depName: string) {
        const service = this._services.get(depName)

        if (!service) {
            throw new Error(`Service ${depName} not found`)
        }

        const { definition, options } = service

        if (options.singleton && this._singletons.has(depName)) {
            return this._singletons.get(depName)
        }

        const dependencies = (options.dependencies || []).map((dep: string) =>
            this.get(dep)
        )

        const instance =
            typeof definition === 'function'
                ? new definition(...dependencies)
                : definition

        if (options.singleton) {
            this._singletons.set(depName, instance)
        }

        return instance
    }
}
