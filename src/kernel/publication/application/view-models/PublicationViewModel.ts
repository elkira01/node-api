import { PublicationStatus } from '../../domain/type/PublicationStatus'

export class BookViewModel {
    constructor(
        public id: string,
        public title: string,
        public authorId: string,
        public authorName: string,
        public categoryId: string,
        public categoryName: string,
        public resume: string,
        public coverImageUrl: string,
        public contentFileUrl: string,
        public sellingPrice: number | null,
        public rentalPrice: number | null,
        public rentalPeriod: any,
        public status: PublicationStatus,
        public createdAt: any,
        public updatedAt: any
    ) {}
}

export class MagazineViewModel {
    constructor(
        public id: string,
        public title: string,
        public editorName: string,
        public categoryId: string,
        public categoryName: string,
        public resume: string,
        public coverImageUrl: string,
        public contentFileUrl: string,
        public sellingPrice: number | null,
        public rentalPrice: number | null,
        public rentalPeriod: any,
        public status: PublicationStatus,
        public createdAt: any,
        public updatedAt: any
    ) {}
}
