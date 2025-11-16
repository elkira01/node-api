import { DeletePublicationCommand } from '../../use-cases/command/DeletePublicationCommand'
import { IPublicationRepository } from '../../../domain/repository/IPublicationRepository'

export class DeletePublicationHandler {
    constructor(private repository: IPublicationRepository) {}

    handle(command: DeletePublicationCommand): Promise<void> {
        return this.repository.delete(command.publicationId)
    }
}
