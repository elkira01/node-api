import { DependencyContainer } from '../../../../infrastructure/dependencies/DependencyContainer'
import { AuthorEntityRepositoryImpl } from '../persistence/AuthorEntityRepositoryImpl'
import { AuthorCollectionRepositoryImpl } from '../persistence/AuthorCollectionRepositoryImpl'
import { AuthorReadModelRepositoryImpl } from '../persistence/AuthorReadModelRepositoryImpl'

const authorContainer = new DependencyContainer()

authorContainer.bind('IAuthorRepository', AuthorEntityRepositoryImpl)
authorContainer.bind('IPublicationCollection', AuthorCollectionRepositoryImpl)
authorContainer.bind('IPublicationReadModel', AuthorReadModelRepositoryImpl)

export default authorContainer
