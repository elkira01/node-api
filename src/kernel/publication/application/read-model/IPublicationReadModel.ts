import { GetPublicationQuery } from '../use-cases/query/GetPublicationQuery'
import {
    BookViewModel,
    MagazineViewModel,
} from '../view-models/PublicationViewModel'

export interface IPublicationReadModel {
    viewBook(query: GetPublicationQuery): Promise<BookViewModel | null>
    viewMagazine(query: GetPublicationQuery): Promise<MagazineViewModel | null>
}
