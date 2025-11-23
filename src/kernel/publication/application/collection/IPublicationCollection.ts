import { PublicationSelectViewModel } from '../view-models/PublicationSelectViewModel'
import { PublicationCollectionViewModel } from '../view-models/PublicationCollectionViewModel'
import { GetPublicationCollectionQuery } from '../use-cases/query/GetPublicationCollectionQuery'
import { GetPublicationCollectionByCategoryQuery } from '../use-cases/query/GetPublicationCollectionByCategoryQuery'
import { CollectionResponseType } from '../../../../shared-kernel/application/response/CollectionResponseType'

export interface IPublicationCollection {
    collection(
        query: GetPublicationCollectionQuery
    ): Promise<CollectionResponseType<PublicationCollectionViewModel>>

    collectionByCategory(
        query: GetPublicationCollectionByCategoryQuery
    ): Promise<CollectionResponseType<PublicationCollectionViewModel>>

    collectionForSelect(
        query: GetPublicationCollectionQuery
    ): Promise<CollectionResponseType<PublicationSelectViewModel>>
}
