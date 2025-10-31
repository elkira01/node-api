import {
    publicationCommandBus,
    publicationQueryBus,
} from '../../kernel/publication/infrastructure/dependencies/bus'
import {
    authorCommandBus,
    authorQueryBus,
} from '../../kernel/authors/infrastructure/dependencies/bus'

export const busConfig = {
    publication: { command: publicationCommandBus, query: publicationQueryBus },
    author: { command: authorCommandBus, query: authorQueryBus },
}
