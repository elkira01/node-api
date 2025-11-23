export interface CollectionResponseType<DataType> {
    data: Array<DataType>
    analytics?: any
    meta: {
        pagination: { page: number; limit: number; total: number }
        filter?: any
        order?: Array<string>
    }
}
