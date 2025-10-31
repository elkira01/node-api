import { PublicationCategoryOrmRepository } from '../persistence/orm/PublicationCategoryOrmRepository'
import { PublicationOrmRepository } from '../persistence/orm/PublicationOrmRepository'
import { DependencyContainer } from '../../../../shared-kernel/infrastructure/DependencyContainer'

const publicationContainer = new DependencyContainer()

publicationContainer.bind(
    'IPublicationCategoryRepository',
    PublicationCategoryOrmRepository
)
publicationContainer.bind('IPublicationRepository', PublicationOrmRepository)

export default publicationContainer
