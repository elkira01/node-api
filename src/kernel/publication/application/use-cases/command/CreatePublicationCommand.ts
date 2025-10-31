import { PublicationType } from '../../../core/type/PublicationType'

export class CreatePublicationCommand {
    constructor(
        public publicationType: PublicationType,
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
