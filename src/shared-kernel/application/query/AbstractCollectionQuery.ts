import { FilterBy, Pagination, SearchBy, SortBy } from './types'

export abstract class AbstractCollectionQuery {
    constructor(
        public pagination: Pagination = { page: 1, limit: 10 },
        public search?: SearchBy,
        public sortOrder?: SortBy,
        public filter?: FilterBy
    ) {}

    getEndIndex(): number {
        return this.pagination.page * this.pagination.limit
    }

    getStartIndex(): number {
        return this.getEndIndex() - this.pagination.limit
    }
}
