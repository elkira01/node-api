import { $Enums } from '@infra/generated/client'
import PublicationType = $Enums.PublicationType

export class UpdatePublicationCommand {
    constructor(
        public publicationId: any,
        public title: string,
        public authorId: any,
        public categoryId: any,
        public resume: string,
        public coverImageUrl: string,
        public contentFileUrl: string,
        public sellingPrice: number,
        public rentalPrice?: number,
        public rentalDuration?: any
    ) {}
}
