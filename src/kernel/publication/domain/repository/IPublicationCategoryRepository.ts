import { PublicationCategory } from '../entity/PublicationCategory'

export interface IPublicationCategoryRepository {
    save(payload: PublicationCategory): Promise<any>
    delete(id: any): Promise<void>
    findById(id: any): Promise<PublicationCategory | null>
}
