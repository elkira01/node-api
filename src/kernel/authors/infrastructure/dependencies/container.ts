import { DependencyContainer } from '../../../../shared-kernel/infrastructure/DependencyContainer'
import { AuthorEntityRepositoryImpl } from '../persistence/orm/AuthorEntityRepositoryImpl'

const authorContainer = new DependencyContainer()

authorContainer.bind('IAuthorRepository', AuthorEntityRepositoryImpl)

export default authorContainer
