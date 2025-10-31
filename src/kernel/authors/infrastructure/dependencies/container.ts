import { DependencyContainer } from '../../../../shared-kernel/infrastructure/DependencyContainer'
import { AuthorOrmRepository } from '../persistence/orm/AuthorOrmRepository'

const authorContainer = new DependencyContainer()

authorContainer.bind('IAuthorRepository', AuthorOrmRepository)

export default authorContainer
