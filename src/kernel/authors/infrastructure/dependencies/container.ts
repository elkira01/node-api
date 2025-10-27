import { DependencyContainer } from '@shared/infrastructure/DependencyContainer'
import { AuthorOrmRepository } from '@app/authors/infrastructure/persistence/orm/AuthorOrmRepository'

const authorContainer = new DependencyContainer()

authorContainer.bind('IAuthorRepository', AuthorOrmRepository)

export default authorContainer
