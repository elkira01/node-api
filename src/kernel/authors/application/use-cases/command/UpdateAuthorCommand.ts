import { AuthorType } from '../../../core/type/AuthorType'

export class UpdateAuthorCommand {
    constructor(
        public authorId: any,
        public firstName: string,
        public lastName: string,
        public type: AuthorType,
        public biography: string,
        public profileImageUrl?: string,
        public email?: string
    ) {}
}
