import { PublicationType } from '../type/PublicationType'
import { InvalidPublicationException } from '../exception/InvalidPublicationException'
import { PublicationStatus } from '../type/PublicationStatus'

export class Publication {
    constructor(
        private id: any,
        private title: string,
        private authorId: string,
        private categoryId: string,
        private publicationType: PublicationType,
        private resume: string,
        private coverImageUrl: string,
        private contentFileUrl: string,
        private sellingPrice?: number,
        private rentalPrice?: number,
        private rentalPeriod?: any,
        private status: PublicationStatus = PublicationStatus.DRAFT,
        private createdAt?: any,
        private updatedAt?: any
    ) {
        if (!rentalPrice && !sellingPrice) {
            throw new InvalidPublicationException(
                'Publication must have a selling or rental price'
            )
        }
    }

    getId() {
        return this.id
    }
    getTitle() {
        return this.title
    }
    getAuthorId() {
        return this.authorId
    }
    getCategoryId() {
        return this.categoryId
    }
    getPublicationType() {
        return this.publicationType
    }
    getResume() {
        return this.resume
    }
    getCoverImageUrl() {
        return this.coverImageUrl
    }
    getContentFileUrl() {
        return this.contentFileUrl
    }
    getSellingPrice() {
        return this.sellingPrice
    }
    getRentalPrice() {
        return this.rentalPrice
    }
    getRentalPeriod() {
        return this.rentalPeriod
    }
    getCreatedAt() {
        return this.createdAt
    }
    getUpdatedAt() {
        return this.updatedAt
    }
    setSellingPrice(sellingPrice: number) {
        this.sellingPrice = sellingPrice
    }
    setRentalPrice(rentalPrice: number) {
        this.rentalPrice = rentalPrice
    }
    setRentalPeriod(rentalPeriod: any) {
        this.rentalPeriod = rentalPeriod
    }
    setCoverImageUrl(coverImageUrl: string) {
        this.coverImageUrl = coverImageUrl
    }
    setContentFileUrl(contentFileUrl: string) {
        this.contentFileUrl = contentFileUrl
    }
    setPublicationType(publicationType: PublicationType) {
        this.publicationType = publicationType
    }

    setStatus(status: PublicationStatus) {
        this.status = status
    }

    getStatus() {
        return this.status
    }
}
