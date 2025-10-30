export class UpdatePublicationCategoryCommand {
    constructor(
        public categoryId: any,
        public designation: string,
        public imageUrl: string,
        public description?: string
    ) {}
}
