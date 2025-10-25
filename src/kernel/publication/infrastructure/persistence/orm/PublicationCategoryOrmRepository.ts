import { IPublicationCategoryRepository } from '@app/publication/domain/repository/IPublicationCategoryRepository'
import { PublicationCategory } from '@app/publication/domain/entity/PublicationCategory'

export class PublicationCategoryOrmRepository
    implements IPublicationCategoryRepository
{
    collection(query: any): Promise<PublicationCategory[]> {
        console.log('collection')
        return Promise.resolve([])
    }

    create(payload: PublicationCategory): Promise<any> {
        console.log('created')
        return Promise.resolve(undefined)
    }

    delete(id: any): Promise<void> {
        console.log('deleted')
        return Promise.resolve(undefined)
    }

    findById(id: any): Promise<PublicationCategory | null> {
        console.log('findById')
        return Promise.resolve(null)
    }

    update(payload: PublicationCategory): Promise<void> {
        console.log('updated')
        return Promise.resolve(undefined)
    }
}
