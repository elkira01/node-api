import { IPublicationCategoryRepository } from '@app/publication/domain/repository/IPublicationCategoryRepository'
import { PublicationCategory } from '@app/publication/domain/entity/PublicationCategory'
import { AbstractOrmRepository } from '@shared/infrastructure/orm/AbstractOrmRepository'

export class PublicationCategoryOrmRepository
    extends AbstractOrmRepository
    implements IPublicationCategoryRepository
{
    constructor() {
        super()
    }

    async collection(query: any): Promise<any[]> {
        return this.repositoryClient.publicationCategory.findMany()
    }

    findById(id: any): Promise<PublicationCategory | null> {
        console.log('findById')
        return Promise.resolve(null)
    }

    async create(payload: PublicationCategory): Promise<any> {
        const result = await this.repositoryClient.publicationCategory.create({
            data: {
                designation: payload.getDesignation(),
                description: payload.getDescription(),
                imageUrl: payload.getImageUrl(),
            },
        })
        return result.id
    }

    delete(id: any): Promise<void> {
        console.log('deleted')
        return Promise.resolve(undefined)
    }

    update(payload: PublicationCategory): Promise<void> {
        console.log('updated')
        return Promise.resolve(undefined)
    }
}
