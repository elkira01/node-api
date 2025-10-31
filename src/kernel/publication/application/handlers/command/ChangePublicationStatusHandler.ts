import { ChangePublicationStatusCommand } from '../../use-cases/command/ChangePublicationStatusCommand'
import { IPublicationRepository } from '../../../core/repository/IPublicationRepository'
import { Publication } from '../../../core/entity/Publication'

export class ChangePublicationStatusHandler {
    constructor(private repository: IPublicationRepository) {}

    async handle(command: ChangePublicationStatusCommand): Promise<void> {
        const publication = await this.repository.findById(
            command.publicationId
        )

        if (!(publication instanceof Publication)) {
            throw new Error(
                `Publication with id ${command.publicationId} not found`
            )
        }

        publication.setStatus(command.status)

        await this.repository.update(publication)
    }
}
