import { IPublicationRepository } from '@app/publication/core/repository/IPublicationRepository'
import { GetPublicationQuery } from '@app/publication/application/use-cases/query/GetPublicationQuery'
import { Publication } from '@app/publication/core/entity/Publication'

export class GetPublicationHandler {
    constructor(private repository: IPublicationRepository) {}

    handle(query: GetPublicationQuery): Promise<Publication | null> {
        return this.repository.findById(query.publicationId)
    }
}
