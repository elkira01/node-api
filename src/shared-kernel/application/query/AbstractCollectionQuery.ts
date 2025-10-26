export abstract class AbstractCollectionQuery {
    constructor(
        public page: number,
        public limit: number,
        q?: string,
        public sort?: any,
        public filter?: any
    ) {}

    getEndIndex(): number {
        return this.page * this.limit
    }

    getStartIndex(): number {
        return this.getEndIndex() - this.limit
    }
}
