import { IPublicationRepository } from '@app/publication/core/repository/IPublicationRepository'
import { DeletePublicationCommand } from '../../use-cases/command/DeletePublicationCommand'

export class DeletePublicationHandler {
    constructor(private repository: IPublicationRepository) {}

    handle(command: DeletePublicationCommand): Promise<void> {
        return this.repository.delete(command.publicationId)
    }
}
