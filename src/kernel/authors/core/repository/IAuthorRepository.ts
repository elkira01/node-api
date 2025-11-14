import { Author } from '../entity/Author'

export interface IAuthorRepository {
    save(payload: Author): Promise<any>
    delete(id: any): Promise<void>
    findByKey(key: string, value: any): Promise<Author | null>
}
