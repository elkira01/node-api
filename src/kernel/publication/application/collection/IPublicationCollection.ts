import { PublicationSelectViewModel } from '../view-models/PublicationSelectViewModel'
import { PublicationCollectionViewModel } from '../view-models/PublicationCollectionViewModel'
import { GetPublicationCollectionQuery } from '../use-cases/query/GetPublicationCollectionQuery'
import { GetPublicationCollectionByCategoryQuery } from '../use-cases/query/GetPublicationCollectionByCategoryQuery'

export interface IPublicationCollection {
    collection(
        query: GetPublicationCollectionQuery
    ): Promise<PublicationCollectionViewModel[]>

    collectionByCategory(
        query: GetPublicationCollectionByCategoryQuery
    ): Promise<PublicationCollectionViewModel[]>

    collectionForSelect(
        query: GetPublicationCollectionQuery
    ): Promise<PublicationSelectViewModel[]>
}
