import { CommandBus } from '@shared/infrastructure/bus/CommandBus'
import { QueryBus } from '@shared/infrastructure/bus/QueryBus'

import { servicesBindings } from '@infra/dependencies/services-bindings'
import { CreateAuthorHandler } from '@app/authors/application/handlers/command/CreateAuthorHandler'
import { UpdateAuthorHandler } from '@app/authors/application/handlers/command/UpdateAuthorHandler'
import { DeleteAuthorHandler } from '@app/authors/application/handlers/command/DeleteAuthorHandler'
import { GetAuthorHandler } from '@app/authors/application/handlers/query/GetAuthorHandler'
import { GetAuthorCollectionHandler } from '@app/authors/application/handlers/query/GetAuthorCollectionHandler'

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
authorQueryBus.register(
    'GetAuthorCollectionQuery',
    GetAuthorCollectionHandler,
    ['IAuthorRepository']
)

export { authorQueryBus, authorCommandBus }
