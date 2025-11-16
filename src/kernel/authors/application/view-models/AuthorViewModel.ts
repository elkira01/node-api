import { AuthorType } from '../../core/type/AuthorType'

export class AuthorViewModel {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string | null,
        public type: AuthorType,
        public publications: {
            id: string
            title: string
            coverImageUrl: string
            sellingPrice: number
        }[],
        public email: string | null,
        public picture: string | null,
        public biography: string | null,
        public createdAt: Date
    ) {}
}
