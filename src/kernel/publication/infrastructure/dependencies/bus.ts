import { CommandBus } from '../../../../shared-kernel/infrastructure/bus/CommandBus'
import { servicesBindings } from '../../../../infrastructure/dependencies/services-bindings'
import { QueryBus } from '../../../../shared-kernel/infrastructure/bus/QueryBus'
import { CreatePublicationCategoryHandler } from '../../application/handlers/command/category/CreatePublicationCategoryHandler'
import { UpdatePublicationCategoryHandler } from '../../application/handlers/command/category/UpdatePublicationCategoryHandler'
import { DeletePublicationCategoryHandler } from '../../application/handlers/command/category/DeletePublicationCategoryHandler'
import { CreatePublicationHandler } from '../../application/handlers/command/CreatePublicationHandler'
import { UpdatePublicationHandler } from '../../application/handlers/command/UpdatePublicationHandler'
import { DeletePublicationHandler } from '../../application/handlers/command/DeletePublicationHandler'
import { ChangePublicationStatusHandler } from '../../application/handlers/command/ChangePublicationStatusHandler'
import { GetPublicationCategoryHandler } from '../../application/handlers/query/GetPublicationCategoryHandler'
import { GetPublicationCategoryCollectionHandler } from '../../application/handlers/query/GetPublicationCategoryCollectionHandler'
import { GetPublicationHandler } from '../../application/handlers/query/GetPublicationHandler'
import { GetPublicationCollectionHandler } from '../../application/handlers/query/GetPublicationCollectionHandler'

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
