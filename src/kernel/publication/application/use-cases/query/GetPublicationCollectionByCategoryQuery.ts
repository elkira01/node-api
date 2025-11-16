import { AbstractCollectionQuery } from '../../../../../shared-kernel/application/query/AbstractCollectionQuery'

export class GetPublicationCollectionByCategoryQuery extends AbstractCollectionQuery {
    constructor(
        public categoryId: any,
        public page: number = 1,
        public pageSize: number = 10,
        public search?: string
    ) {
        super(page, pageSize, search)
    }
}
