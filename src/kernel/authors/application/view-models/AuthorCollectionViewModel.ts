export class AuthorCollectionViewModel {
    constructor(
        public id: string,
        public firstName: string,
        public createdAt: Date,
        public lastName: string | null,
        public email: string | null,
        public picture: string | null
    ) {}
}
