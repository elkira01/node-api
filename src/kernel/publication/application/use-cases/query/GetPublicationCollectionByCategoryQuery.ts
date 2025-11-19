import { AbstractCollectionQuery } from '../../../../../shared-kernel/application/query/AbstractCollectionQuery'

export class GetPublicationCollectionByCategoryQuery extends AbstractCollectionQuery {
    constructor(public categoryId: any) {
        super()
    }
}
