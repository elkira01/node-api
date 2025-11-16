import { PublicationStatus } from '../../domain/type/PublicationStatus'

export class PublicationSelectViewModel {
    constructor(
        public id: string,
        public title: string,
        public coverImageUrl: string
    ) {}
}
