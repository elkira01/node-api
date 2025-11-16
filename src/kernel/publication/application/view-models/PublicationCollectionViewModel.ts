import { PublicationStatus } from '../../domain/type/PublicationStatus'

export class PublicationCollectionViewModel {
    constructor(
        public id: string,
        public title: string,
        public authorId: string,
        public authorName: string,
        public categoryName: string | null,
        public coverImageUrl: string,
        public sellingPrice: number,
        public status: PublicationStatus = PublicationStatus.DRAFT,
        public createdAt: any
    ) {}
}
