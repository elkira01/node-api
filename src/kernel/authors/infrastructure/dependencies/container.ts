import { DependencyContainer } from '../../../../shared-kernel/infrastructure/DependencyContainer'
import { AuthorEntityRepositoryImpl } from '../persistence/AuthorEntityRepositoryImpl'
import { AuthorCollectionRepositoryImpl } from '../persistence/AuthorCollectionRepositoryImpl'
import { AuthorReadModelRepositoryImpl } from '../persistence/AuthorReadModelRepositoryImpl'

const authorContainer = new DependencyContainer()

authorContainer.bind('IAuthorRepository', AuthorEntityRepositoryImpl)
authorContainer.bind('IAuthorCollection', AuthorCollectionRepositoryImpl)
authorContainer.bind('IAuthorReadModel', AuthorReadModelRepositoryImpl)

export default authorContainer
