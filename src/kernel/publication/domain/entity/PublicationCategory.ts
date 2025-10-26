export class PublicationCategory {
    constructor(
        private id: any,
        private designation: string,
        private imageUrl: string,
        private description?: string,
        private createdAt?: any,
        private updatedAt?: any
    ) {}

    getDesignation() {
        return this.designation
    }
    getDescription() {
        return this.description
    }
    getImageUrl() {
        return this.imageUrl
    }
}
