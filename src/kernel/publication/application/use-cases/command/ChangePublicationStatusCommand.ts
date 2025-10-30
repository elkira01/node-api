import { PublicationStatus } from '@app/publication/core/type/PublicationStatus'

export class ChangePublicationStatusCommand {
    constructor(
        public publicationId: any,
        public status: PublicationStatus
    ) {}
}
