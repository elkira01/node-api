import { Publication } from '@app/publication/core/entity/Publication'

export interface IPublicationRepository {
    create(payload: Publication): Promise<any>
    update(payload: Publication): Promise<void>
    delete(id: any): Promise<void>
    findById(id: any): Promise<Publication | null>
    collection(query: any): Promise<Publication[]>
}
