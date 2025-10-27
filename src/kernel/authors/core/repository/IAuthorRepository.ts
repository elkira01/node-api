import { Author } from '../entity/Author'

export interface IAuthorRepository {
    create(payload: Author): Promise<any>
    update(payload: Author): Promise<void>
    delete(id: any): Promise<void>
    findById(id: any): Promise<Author | null>
    findByEmail(id: any): Promise<Author | null>
    collection(query: any): Promise<Author[]>
}
