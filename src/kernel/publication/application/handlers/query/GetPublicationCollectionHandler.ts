import { IPublicationRepository } from '../../../core/repository/IPublicationRepository'
import { GetPublicationCollectionQuery } from '../../use-cases/query/GetPublicationCollectionQuery'

export class GetPublicationCollectionHandler {
    constructor(private repository: IPublicationRepository) {}

    handle(query: GetPublicationCollectionQuery): Promise<any[]> {
        return this.repository.collection(query)
    }
}
