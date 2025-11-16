import { PublicationCategoryOrmRepository } from '../persistence/PublicationCategoryOrmRepository'
import { PublicationOrmRepository } from '../persistence/PublicationOrmRepository'
import { DependencyContainer } from '../../../../infrastructure/dependencies/DependencyContainer'
import { PublicationCollectionRepositoryImpl } from '../persistence/PublicationCollectionRepositoryImpl'
import { PublicationReadModelRepositoryImpl } from '../persistence/PublicationReadModelRepositoryImpl'

const publicationContainer = new DependencyContainer()

publicationContainer.bind(
    'IPublicationCategoryRepository',
    PublicationCategoryOrmRepository
)
publicationContainer.bind('IPublicationRepository', PublicationOrmRepository)
publicationContainer.bind(
    'IPublicationCollection',
    PublicationCollectionRepositoryImpl
)
publicationContainer.bind(
    'IPublicationReadModel',
    PublicationReadModelRepositoryImpl
)

export default publicationContainer
