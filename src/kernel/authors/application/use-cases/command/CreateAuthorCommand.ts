import { AuthorType } from '@app/authors/core/type/AuthorType'

export class CreateAuthorCommand {
    constructor(
        public firstName: string,
        public lastName: string,
        public type: AuthorType,
        public biography: string,
        public profileImageUrl?: string,
        public email?: string
    ) {}
}
