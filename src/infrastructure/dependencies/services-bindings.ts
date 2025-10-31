import publicationContainer from '../../kernel/publication/infrastructure/dependencies/container'
import authorContainer from '../../kernel/authors/infrastructure/dependencies/container'

export const servicesBindings = {
    publication: publicationContainer,
    author: authorContainer,
}
