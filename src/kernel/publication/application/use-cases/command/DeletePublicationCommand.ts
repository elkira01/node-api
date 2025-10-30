import { $Enums } from '@infra/generated/client'
import PublicationType = $Enums.PublicationType

export class DeletePublicationCommand {
    constructor(public publicationId: any) {}
}
