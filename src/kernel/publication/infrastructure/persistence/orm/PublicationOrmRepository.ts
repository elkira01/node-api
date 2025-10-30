import { Publication } from '@app/publication/core/entity/Publication'
import { AbstractOrmRepository } from '@shared/infrastructure/orm/AbstractOrmRepository'
import { AbstractCollectionQuery } from '@shared/application/query/AbstractCollectionQuery'
import { IPublicationRepository } from '@app/publication/core/repository/IPublicationRepository'
import { PublicationType } from '@app/publication/core/type/PublicationType'

export class PublicationOrmRepository
    extends AbstractOrmRepository
    implements IPublicationRepository
{
    constructor() {
        super()
    }

    async collection(query: AbstractCollectionQuery): Promise<any> {
        const results = await this.repositoryClient.publication.findMany({
            skip: query.getStartIndex(),
            take: query.limit,
            where: {
                title: {
                    startsWith: query.q,
                    mode: 'insensitive',
                },
            },
        })

        return { data: results }
    }

    async findById(id: any): Promise<Publication | null> {
        const resp = await this.repositoryClient.publication.findUnique({
            where: { id: id },
        })

        if (resp) {
            return Promise.resolve(
                new Publication(
                    resp.id,
                    resp.title,
                    resp.authorId,
                    resp.categoryId,
                    resp.type as PublicationType,
                    resp.resume,
                    resp.coverImageUrl,
                    resp.coverImageUrl,
                    resp.sellingPrice as unknown as number,
                    resp.rentalPrice as unknown as number,
                    resp.rentalPeriod
                )
            )
        }
        return Promise.resolve(null)
    }

    async create(payload: Publication): Promise<any> {
        const result = await this.repositoryClient.publication.create({
            data: {
                title: payload.getTitle(),
                type: payload.getPublicationType(),
                authorId: payload.getAuthorId(),
                categoryId: payload.getCategoryId(),
                resume: payload.getResume(),
                coverImageUrl: payload.getCoverImageUrl(),
                contentFileUrl: payload.getContentFileUrl(),
                sellingPrice: payload.getSellingPrice() as number,
                rentalPrice: payload.getRentalPrice() as number,
                rentalPeriod: payload.getRentalPeriod(),
                status: payload.getStatus(),
            },
        })
        return result.id
    }

    async delete(id: any): Promise<void> {
        await this.repositoryClient.publication.delete({
            where: { id: id },
        })
    }

    async update(payload: Publication): Promise<void> {
        await this.repositoryClient.publication.update({
            where: { id: payload.getId() },
            data: {
                title: payload.getTitle(),
                authorId: payload.getAuthorId(),
                categoryId: payload.getCategoryId(),
                resume: payload.getResume(),
                coverImageUrl: payload.getCoverImageUrl(),
                contentFileUrl: payload.getContentFileUrl(),
                sellingPrice: payload.getSellingPrice() as number,
                rentalPrice: payload.getRentalPrice() as number,
                rentalPeriod: payload.getRentalPeriod(),
                status: payload.getStatus(),
            },
        })
    }
}
