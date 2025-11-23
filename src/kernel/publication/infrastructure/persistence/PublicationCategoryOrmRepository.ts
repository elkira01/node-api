import { AbstractOrmRepository } from '../../../../shared-kernel/infrastructure/prisma/AbstractOrmRepository'
import { IPublicationCategoryRepository } from '../../domain/repository/IPublicationCategoryRepository'
import { AbstractCollectionQuery } from '../../../../shared-kernel/application/query/AbstractCollectionQuery'
import { PublicationCategory } from '../../domain/entity/PublicationCategory'

export class PublicationCategoryOrmRepository
    extends AbstractOrmRepository
    implements IPublicationCategoryRepository
{
    constructor() {
        super()
    }

    async collection(query: AbstractCollectionQuery): Promise<any> {
        const results = await this.entityManager.publicationCategory.findMany({
            skip: query.getStartIndex(),
            take: query.pagination.limit,
            where: {
                designation: {
                    startsWith: query.search,
                    mode: 'insensitive',
                },
            },
        })

        return { data: results }
    }

    async findById(id: any): Promise<PublicationCategory | null> {
        const resp = await this.entityManager.publicationCategory.findUnique({
            where: { id: id },
        })

        if (resp) {
            return Promise.resolve(
                new PublicationCategory(
                    resp.id,
                    resp.designation,
                    resp.imageUrl,
                    resp.description,
                    resp.createdAt,
                    resp.updatedAt
                )
            )
        }
        return Promise.resolve(null)
    }

    async save(payload: PublicationCategory): Promise<any> {
        const result = await this.entityManager.publicationCategory.create({
            data: {
                designation: payload.getDesignation(),
                description: payload.getDescription(),
                imageUrl: payload.getImageUrl(),
            },
        })
        return result.id
    }

    async delete(id: any): Promise<void> {
        await this.entityManager.publicationCategory.delete({
            where: { id: id },
        })
    }

    async update(payload: PublicationCategory): Promise<void> {
        await this.entityManager.publicationCategory.update({
            where: { id: payload.getId() },
            data: {
                designation: payload.getDesignation(),
                description: payload.getDescription(),
                imageUrl: payload.getImageUrl(),
            },
        })
    }
}
