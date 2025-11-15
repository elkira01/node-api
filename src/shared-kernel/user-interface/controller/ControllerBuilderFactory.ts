import { servicesBindings } from '../../../infrastructure/dependencies/services-bindings'

export class ControllerBuilderFactory {
    static build<TDependency>(
        controller: new (...dependencyArgs: TDependency[]) => any
    ) {
        type ConstructorType = Parameters<
            (...dependencyArgs: TDependency[]) => any
        >

        const dependencies = controller.constructor.arguments.map(
            (arg: any) => {
                const binding = Object.values(servicesBindings).find(
                    (binding) => !!binding.get(typeof arg)
                )

                if (!binding)
                    throw new Error(`No binding found for ${typeof arg}`)

                return binding?.get(typeof arg)
            }
        )
        console.log(dependencies)

        return new controller(...dependencies)
    }
}
