import { ChangePublicationStatusCommand } from '../../use-cases/command/ChangePublicationStatusCommand'
import { IPublicationRepository } from '../../../domain/repository/IPublicationRepository'
import { Publication } from '../../../domain/entity/Publication'
import { NotFoundException } from '../../../../../shared-kernel/domain/NotFoundException'

export class ChangePublicationStatusHandler {
    constructor(private repository: IPublicationRepository) {}

    async handle(command: ChangePublicationStatusCommand): Promise<void> {
        const publication = await this.repository.findById(
            command.publicationId
        )

        if (!(publication instanceof Publication)) {
            throw new NotFoundException(
                `Publication with id ${command.publicationId} not found`
            )
        }

        publication.setStatus(command.status)

        await this.repository.save(publication)
    }
}
