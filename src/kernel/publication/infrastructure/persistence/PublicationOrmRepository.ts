import { IPublicationRepository } from '../../domain/repository/IPublicationRepository'
import { AbstractOrmRepository } from '../../../../shared-kernel/infrastructure/prisma/AbstractOrmRepository'
import { AbstractCollectionQuery } from '../../../../shared-kernel/application/query/AbstractCollectionQuery'
import { PublicationType } from '../../domain/type/PublicationType'
import { Publication } from '../../domain/entity/Publication'

export class PublicationOrmRepository
    extends AbstractOrmRepository
    implements IPublicationRepository
{
    constructor() {
        super()
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

    async save(payload: Publication): Promise<void> {
        !payload.getId()
            ? await this.repositoryClient.publication.create({
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
            : await this.repositoryClient.publication.update({
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

    async delete(id: any): Promise<void> {
        await this.repositoryClient.publication.delete({
            where: { id: id },
        })
    }
}
