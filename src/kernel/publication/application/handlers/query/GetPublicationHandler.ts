import { IPublicationRepository } from '../../../core/repository/IPublicationRepository'
import { GetPublicationQuery } from '../../use-cases/query/GetPublicationQuery'
import { Publication } from '../../../core/entity/Publication'

export class GetPublicationHandler {
    constructor(private repository: IPublicationRepository) {}

    handle(query: GetPublicationQuery): Promise<Publication | null> {
        return this.repository.findById(query.publicationId)
    }
}
