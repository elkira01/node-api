import { IPublicationCollection } from '../../application/collection/IPublicationCollection'
import { AbstractOrmRepository } from '../../../../shared-kernel/infrastructure/prisma/AbstractOrmRepository'
import { GetPublicationCollectionQuery } from '../../application/use-cases/query/GetPublicationCollectionQuery'
import { PublicationSelectViewModel } from '../../application/view-models/PublicationSelectViewModel'
import { PublicationCollectionViewModel } from '../../application/view-models/PublicationCollectionViewModel'
import { PublicationStatus } from '../../domain/type/PublicationStatus'
import { GetPublicationCollectionByCategoryQuery } from '../../application/use-cases/query/GetPublicationCollectionByCategoryQuery'
import { CollectionResponseType } from '../../../../shared-kernel/application/response/CollectionResponseType'

export class PublicationCollectionRepositoryImpl
    extends AbstractOrmRepository
    implements IPublicationCollection
{
    async collection(
        query: GetPublicationCollectionQuery
    ): Promise<CollectionResponseType<PublicationCollectionViewModel>> {
        let searchQueryClause = this.queryBuilder.sql``
        let filterQueryClause = this.queryBuilder.sql``

        if (query.search) {
            searchQueryClause = this.queryBuilder
                .sql` ${query.filter ? this.queryBuilder.sql`AND` : this.queryBuilder.sql`WHERE`} auth."firstName" ILIKE ${query.search} OR auth."lastName" ILIKE ${query.search}`
        }

        if (query.filter?.status && (query.filter.status as any) !== 'all') {
            filterQueryClause = this.queryBuilder
                .sql`WHERE status = ${query.filter.status}::"PublicationStatus"`
        }

        const baseQueryClause = this.queryBuilder.sql`
            SELECT
                   p.id as id, p.title as title, "p"."authorId" as author_id, "p"."coverImageUrl" as cover_image_url, "p"."sellingPrice" as selling_price, p.status as status, p."createdAt" as created_at,
                   pc.designation as category,
                   auth."firstName" || ' ' || auth."lastName" as author
            FROM
                   "Publication" AS p
                       JOIN
                   "PublicationCategory" AS pc ON p."categoryId" = pc.id
                       JOIN
                   "Author" AS auth ON p."authorId" = auth."id"`

        const paginationClause = this.queryBuilder.sql`
            LIMIT ${query.pagination.limit} 
                OFFSET ${query.getStartIndex()}`

        const completeQuery = this.queryBuilder
            .sql`${baseQueryClause}${filterQueryClause}${searchQueryClause}${paginationClause}`

        const results = await this.entityManager.$queryRaw(completeQuery)

        return {
            data: (results as any[]).map((item: any) => {
                return new PublicationCollectionViewModel(
                    item.id,
                    item.title,
                    item.author_id,
                    item.author,
                    item.category,
                    item.cover_image_url,
                    item.selling_price as unknown as number,
                    item.status as PublicationStatus,
                    item.created_at
                )
            }),
            meta: {
                pagination: {
                    page: query.pagination.page,
                    limit: query.pagination.limit,
                    total: await this.entityManager.publication.count(),
                },
                filter: {
                    status: [
                        'all',
                        PublicationStatus.DRAFT,
                        PublicationStatus.PUBLISHED,
                    ],
                },
                order: [
                    'created_at_asc',
                    'created_at_desc',
                    'title_asc',
                    'title_desc',
                ],
            },
        }
    }

    async collectionForSelect(
        query: GetPublicationCollectionQuery
    ): Promise<CollectionResponseType<PublicationSelectViewModel>> {
        const results = await this.entityManager.publication.findMany({
            skip: query.getStartIndex(),
            take: query.pagination.limit,
            where: {
                title: {
                    startsWith: query.search,
                    mode: 'insensitive',
                },
            },
        })

        return {
            data: results.map(
                (item) =>
                    new PublicationSelectViewModel(
                        item.id,
                        item.title,
                        item.coverImageUrl
                    )
            ),
            meta: {
                pagination: {
                    page: query.pagination.page,
                    limit: query.pagination.limit,
                    total: await this.entityManager.publication.count(),
                },
            },
        }
    }
    async collectionByCategory(
        query: GetPublicationCollectionByCategoryQuery
    ): Promise<CollectionResponseType<PublicationCollectionViewModel>> {
        const results = await this.entityManager.publication.findMany({
            skip: query.getStartIndex(),
            take: query.pagination.limit,
            where: {
                categoryId: query.categoryId,
            },
            include: {
                Author: { select: { firstName: true, lastName: true } },
            },
        })

        return {
            data: (results as any[]).map((item: any) => {
                return new PublicationCollectionViewModel(
                    item.id,
                    item.title,
                    item.author_id,
                    item.author,
                    item.category,
                    item.cover_image_url,
                    item.selling_price as unknown as number,
                    item.status as PublicationStatus,
                    item.created_at
                )
            }),
            meta: {
                pagination: {
                    page: query.pagination.page,
                    limit: query.pagination.limit,
                    total: await this.entityManager.publication.count(),
                },
            },
        }
    }
}
