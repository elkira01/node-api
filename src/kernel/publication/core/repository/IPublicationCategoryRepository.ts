import { PublicationCategory } from '../entity/PublicationCategory'

export interface IPublicationCategoryRepository {
    create(payload: PublicationCategory): Promise<any>
    update(payload: PublicationCategory): Promise<void>
    delete(id: any): Promise<void>
    findById(id: any): Promise<PublicationCategory | null>
    collection(query: any): Promise<PublicationCategory[]>
}
