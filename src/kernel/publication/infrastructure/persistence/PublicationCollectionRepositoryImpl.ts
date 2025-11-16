import { IPublicationCollection } from '../../application/collection/IPublicationCollection'
import { AbstractOrmRepository } from '../../../../shared-kernel/infrastructure/prisma/AbstractOrmRepository'
import { GetPublicationCollectionQuery } from '../../application/use-cases/query/GetPublicationCollectionQuery'
import { PublicationSelectViewModel } from '../../application/view-models/PublicationSelectViewModel'
import { PublicationCollectionViewModel } from '../../application/view-models/PublicationCollectionViewModel'
import { PublicationStatus } from '../../domain/type/PublicationStatus'
import { GetPublicationCollectionByCategoryQuery } from '../../application/use-cases/query/GetPublicationCollectionByCategoryQuery'

export class PublicationCollectionRepositoryImpl
    extends AbstractOrmRepository
    implements IPublicationCollection
{
    async collectionByCategory(
        query: GetPublicationCollectionByCategoryQuery
    ): Promise<PublicationCollectionViewModel[]> {
        const results = await this.repositoryClient.publication.findMany({
            skip: query.getStartIndex(),
            take: query.limit,
            where: {
                categoryId: query.categoryId,
            },
            include: {
                Author: { select: { firstName: true, lastName: true } },
            },
        })

        return (results as any[]).map(
            (item: any) =>
                new PublicationCollectionViewModel(
                    item.id,
                    item.title,
                    item.authorId,
                    `${item.Author?.firstName} ${item.Author?.lastName}`,
                    null,
                    item.coverImageUrl,
                    item.sellingPrice as unknown as number,
                    item.status as PublicationStatus,
                    item.createdAt
                )
        )
    }
    async collection(
        query: GetPublicationCollectionQuery
    ): Promise<PublicationCollectionViewModel[]> {
        const results = await this.repositoryClient
            .$queryRaw`SELECT * FROM "Publication" JOIN "PublicationCategory" ON "Publication"."categoryId" = "PublicationCategory".id JOIN "Author" ON "Publication"."authorId" = "Author"."id" ORDER BY "Publication"."createdAt" DESC LIMIT ${query.limit} OFFSET ${query.getStartIndex()}`

        return (results as any[]).map(
            (item: any) =>
                new PublicationCollectionViewModel(
                    item.id,
                    item.title,
                    item.authorId,
                    `${item.firstName} ${item.lastName}`,
                    item.designation,
                    item.coverImageUrl,
                    item.sellingPrice as unknown as number,
                    item.status as PublicationStatus,
                    item.createdAt
                )
        )
    }

    async collectionForSelect(
        query: GetPublicationCollectionQuery
    ): Promise<PublicationSelectViewModel[]> {
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

        return results.map(
            (item) =>
                new PublicationSelectViewModel(
                    item.id,
                    item.title,
                    item.coverImageUrl
                )
        )
    }
}
