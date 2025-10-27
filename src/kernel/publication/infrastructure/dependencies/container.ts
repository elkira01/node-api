import { DependencyContainer } from '@shared/infrastructure/DependencyContainer'
import { PublicationCategoryOrmRepository } from '@app/publication/infrastructure/persistence/orm/PublicationCategoryOrmRepository'

const publicationContainer = new DependencyContainer()

publicationContainer.bind('IAuthorRepository', PublicationCategoryOrmRepository)

export default publicationContainer
