export type SortBy = Array<string> | { [key: string]: string[] }

export type FilterBy = Array<string> | { [key: string]: any }

export type SearchBy = { [key: string]: any }

export type Pagination = { page: number; limit: number; total?: number }
