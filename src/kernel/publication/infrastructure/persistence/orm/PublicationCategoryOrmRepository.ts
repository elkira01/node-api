import { IPublicationCategoryRepository } from '@app/publication/domain/repository/IPublicationCategoryRepository'
import { PublicationCategory } from '@app/publication/domain/entity/PublicationCategory'
import { AbstractOrmRepository } from '@shared/infrastructure/orm/AbstractOrmRepository'
import { AbstractCollectionQuery } from '@shared/application/query/AbstractCollectionQuery'

export class PublicationCategoryOrmRepository
    extends AbstractOrmRepository
    implements IPublicationCategoryRepository
{
    constructor() {
        super()
    }

    async collection(query: AbstractCollectionQuery): Promise<any> {
        console.log(query)

        const results =
            await this.repositoryClient.publicationCategory.findMany({
                skip: query.getStartIndex(),
                take: query.limit,
                where: {
                    designation: {
                        startsWith: query.q,
                        mode: 'insensitive',
                    },
                },
            })

        return { data: results }
    }

    async findById(id: any): Promise<PublicationCategory | null> {
        const resp = await this.repositoryClient.publicationCategory.findUnique(
            {
                where: { id: id },
            }
        )

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

    async delete(id: any): Promise<void> {
        await this.repositoryClient.publicationCategory.delete({
            where: { id: id },
        })
    }

    async update(payload: PublicationCategory): Promise<void> {
        await this.repositoryClient.publicationCategory.update({
            where: { id: payload.getId() },
            data: {
                designation: payload.getDesignation(),
                description: payload.getDescription(),
                imageUrl: payload.getImageUrl(),
            },
        })
    }
}
