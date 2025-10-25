import {
    publicationCommandBus,
    publicationQueryBus,
} from '@app/publication/infrastructure/dependencies/bus'

export const busConfig = {
    publication: { command: publicationCommandBus, query: publicationQueryBus },
}
