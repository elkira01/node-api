import { AuthorType } from '@app/authors/core/type/AuthorType'

export class UpdateAuthorCommand {
    constructor(
        public authorId: any,
        public firstName: string,
        public lastName: string,
        public type: AuthorType,
        public profileImageUrl?: string,
        public biography?: string,
        public email?: string
    ) {}
}
