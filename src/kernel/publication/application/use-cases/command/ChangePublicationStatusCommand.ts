import { PublicationStatus } from '../../../core/type/PublicationStatus'

export class ChangePublicationStatusCommand {
    constructor(
        public publicationId: any,
        public status: PublicationStatus
    ) {}
}
