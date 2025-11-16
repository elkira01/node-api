import { CommandBus } from '../../../../shared-kernel/infrastructure/bus/CommandBus'
import { servicesBindings } from '../../../../infrastructure/config/services-bindings'
import { QueryBus } from '../../../../shared-kernel/infrastructure/bus/QueryBus'
import { CreateAuthorHandler } from '../../application/handlers/command/CreateAuthorHandler'
import { UpdateAuthorHandler } from '../../application/handlers/command/UpdateAuthorHandler'
import { DeleteAuthorHandler } from '../../application/handlers/command/DeleteAuthorHandler'
import { GetAuthorHandler } from '../../application/handlers/query/GetAuthorHandler'
import { GetAuthorCollectionHandler } from '../../application/handlers/query/GetAuthorCollectionHandler'
import { GetAuthorByEmailHandler } from '../../application/handlers/query/GetAuthorByEmailHandler'

const authorCommandBus = new CommandBus(servicesBindings.author)
const authorQueryBus = new QueryBus(servicesBindings.author)

authorCommandBus.register('CreateAuthorCommand', CreateAuthorHandler, [
    'IAuthorRepository',
])

authorCommandBus.register('UpdateAuthorCommand', UpdateAuthorHandler, [
    'IAuthorRepository',
])

authorCommandBus.register('DeleteAuthorCommand', DeleteAuthorHandler, [
    'IAuthorRepository',
])

authorQueryBus.register('GetAuthorQuery', GetAuthorHandler, [
    'IAuthorRepository',
])

authorQueryBus.register('GetAuthorByEmailQuery', GetAuthorByEmailHandler, [
    'IAuthorRepository',
])

authorQueryBus.register(
    'GetAuthorCollectionQuery',
    GetAuthorCollectionHandler,
    ['IAuthorRepository']
)

export { authorQueryBus, authorCommandBus }
