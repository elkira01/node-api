import { CommandBus } from '@shared/infrastructure/bus/CommandBus'
import { QueryBus } from '@shared/infrastructure/bus/QueryBus'

import { CreatePublicationCategoryHandler } from '@app/publication/application/handlers/command/category/CreatePublicationCategoryHandler'
import { UpdatePublicationCategoryHandler } from '@app/publication/application/handlers/command/category/UpdatePublicationCategoryHandler'
import { DeletePublicationCategoryHandler } from '@app/publication/application/handlers/command/category/DeletePublicationCategoryHandler'
import { GetPublicationCategoryHandler } from '@app/publication/application/handlers/query/GetPublicationCategoryHandler'
import { GetPublicationCategoryCollectionHandler } from '@app/publication/application/handlers/query/GetPublicationCategoryCollectionHandler'
import { servicesBindings } from '@infra/dependencies/services-bindings'
import { ChangePublicationStatusCommand } from '@app/publication/application/use-cases/command/ChangePublicationStatusCommand'
import { ChangePublicationStatusHandler } from '@app/publication/application/handlers/command/ChangePublicationStatusHandler'
import { DeletePublicationHandler } from '@app/publication/application/handlers/command/DeletePublicationHandler'
import { UpdatePublicationHandler } from '@app/publication/application/handlers/command/UpdatePublicationHandler'
import { CreatePublicationHandler } from '@app/publication/application/handlers/command/CreatePublicationHandler'
import { GetPublicationHandler } from '@app/publication/application/handlers/query/GetPublicationHandler'
import { GetPublicationCollectionHandler } from '@app/publication/application/handlers/query/GetPublicationCollectionHandler'

const publicationCommandBus = new CommandBus(servicesBindings.publication)
const publicationQueryBus = new QueryBus(servicesBindings.publication)

publicationCommandBus.register(
    'CreatePublicationCategoryCommand',
    CreatePublicationCategoryHandler,
    ['IPublicationCategoryRepository']
)
publicationCommandBus.register(
    'UpdatePublicationCategoryCommand',
    UpdatePublicationCategoryHandler,
    ['IPublicationCategoryRepository']
)
publicationCommandBus.register(
    'DeletePublicationCategoryCommand',
    DeletePublicationCategoryHandler,
    ['IPublicationCategoryRepository']
)

publicationCommandBus.register(
    'CreatePublicationCommand',
    CreatePublicationHandler,
    ['IPublicationRepository']
)
publicationCommandBus.register(
    'UpdatePublicationCommand',
    UpdatePublicationHandler,
    ['IPublicationRepository']
)
publicationCommandBus.register(
    'DeletePublicationCommand',
    DeletePublicationHandler,
    ['IPublicationRepository']
)
publicationCommandBus.register(
    'ChangePublicationCommand',
    ChangePublicationStatusHandler,
    ['IPublicationRepository']
)

publicationQueryBus.register(
    'GetPublicationCategoryQuery',
    GetPublicationCategoryHandler,
    ['IPublicationCategoryRepository']
)
publicationQueryBus.register(
    'GetPublicationCategoryCollectionQuery',
    GetPublicationCategoryCollectionHandler,
    ['IPublicationCategoryRepository']
)

publicationQueryBus.register('GetPublicationQuery', GetPublicationHandler, [
    'IPublicationRepository',
])
publicationQueryBus.register(
    'GetPublicationCollectionQuery',
    GetPublicationCollectionHandler,
    ['IPublicationRepository']
)

export { publicationQueryBus, publicationCommandBus }
