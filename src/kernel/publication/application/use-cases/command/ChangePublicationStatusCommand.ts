import { PublicationStatus } from '../../../domain/type/PublicationStatus'

export class ChangePublicationStatusCommand {
    constructor(
        public publicationId: any,
        public status: PublicationStatus
    ) {}
}
