import { Publication } from '../entity/Publication'

export interface IPublicationRepository {
    save(payload: Publication): Promise<any>
    delete(id: any): Promise<void>
    findById(id: any): Promise<Publication | null>
}
