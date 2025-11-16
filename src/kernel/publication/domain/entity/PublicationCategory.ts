export class PublicationCategory {
    constructor(
        private id: any,
        private designation: string,
        private imageUrl: string,
        private description?: string | null,
        private createdAt?: any,
        private updatedAt?: any
    ) {}

    getId() {
        return this.id
    }
    getDesignation() {
        return this.designation
    }
    getDescription() {
        return this.description
    }
    getImageUrl() {
        return this.imageUrl
    }
    setDesignation(designation: string) {
        this.designation = designation
    }
    setDescription(description?: string) {
        this.description = description
    }
    setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl
    }
    getCreatedAt() {
        return this.createdAt
    }
    getUpdatedAt() {
        return this.updatedAt
    }
}
