import { IPublicationRepository } from '@app/publication/core/repository/IPublicationRepository'
import { GetPublicationCollectionQuery } from '@app/publication/application/use-cases/query/GetPublicationCollectionQuery'

export class GetPublicationCollectionHandler {
    constructor(private repository: IPublicationRepository) {}

    handle(query: GetPublicationCollectionQuery): Promise<any[]> {
        return this.repository.collection(query)
    }
}
