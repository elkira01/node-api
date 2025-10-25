import { CommandBus } from '@shared/infrastructure/bus/CommandBus'
import { QueryBus } from '@shared/infrastructure/bus/QueryBus'

import { CreatePublicationCategoryHandler } from '@app/publication/application/handlers/command/CreatePublicationCategoryHandler'
import { UpdatePublicationCategoryHandler } from '@app/publication/application/handlers/command/UpdatePublicationCategoryHandler'
import { DeletePublicationCategoryHandler } from '@app/publication/application/handlers/command/DeletePublicationCategoryHandler'
import { GetPublicationCategoryHandler } from '@app/publication/application/handlers/query/GetPublicationCategoryHandler'
import { GetPublicationCategoryCollectionHandler } from '@app/publication/application/handlers/query/GetPublicationCategoryCollectionHandler'
import { servicesBindings } from '@infra/dependencies/services-bindings'

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

export { publicationQueryBus, publicationCommandBus }
