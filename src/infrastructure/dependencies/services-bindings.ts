import publicationContainer from '@app/publication/infrastructure/dependencies/container'
import authorContainer from '@app/authors/infrastructure/dependencies/container'

export const servicesBindings = {
    publication: publicationContainer,
    author: authorContainer,
}
