import { AbstractCollectionQuery } from '../../../../../shared-kernel/application/query/AbstractCollectionQuery'
import { Pagination } from '../../../../../shared-kernel/application/query/types'
import { PublicationStatus } from '../../../domain/type/PublicationStatus'

export class GetPublicationCollectionQuery extends AbstractCollectionQuery {
    constructor(
        public pagination: Pagination,
        public search?: string,
        public sortOrder?: any,
        public filter?: { status?: PublicationStatus; category?: string }
    ) {
        super(pagination, search, sortOrder, filter)
    }
}
