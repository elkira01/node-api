import { DependencyContainer } from '@shared/infrastructure/DependencyContainer'
import { PublicationCategoryOrmRepository } from '../persistence/orm/PublicationCategoryOrmRepository'
import { PublicationOrmRepository } from '../persistence/orm/PublicationOrmRepository'

const publicationContainer = new DependencyContainer()

publicationContainer.bind(
    'IPublicationCategoryRepository',
    PublicationCategoryOrmRepository
)
publicationContainer.bind('IPublicationRepository', PublicationOrmRepository)

export default publicationContainer
