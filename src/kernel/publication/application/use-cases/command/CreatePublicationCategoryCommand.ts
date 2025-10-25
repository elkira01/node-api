export class CreatePublicationCategoryCommand {
    constructor(
        public designation: string,
        public imageUrl: string,
        public description?: string
    ) {}
}
