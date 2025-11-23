import { AbstractCollectionQuery } from '../../../../../shared-kernel/application/query/AbstractCollectionQuery'
import { Pagination } from '../../../../../shared-kernel/application/query/types'
import { PublicationStatus } from '../../../domain/type/PublicationStatus'

export class GetPublicationCollectionQuery extends AbstractCollectionQuery {
    constructor(
        public pagination: Pagination,
        public query?: { title?: string; author?: string },
        public filter?: { status?: PublicationStatus; category?: string }
    ) {
        super(pagination, query, undefined, filter)
    }
}
