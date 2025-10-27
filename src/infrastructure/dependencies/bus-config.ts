import {
    publicationCommandBus,
    publicationQueryBus,
} from '@app/publication/infrastructure/dependencies/bus'
import {
    authorCommandBus,
    authorQueryBus,
} from '@app/authors/infrastructure/dependencies/bus'

export const busConfig = {
    publication: { command: publicationCommandBus, query: publicationQueryBus },
    author: { command: authorCommandBus, query: authorQueryBus },
}
