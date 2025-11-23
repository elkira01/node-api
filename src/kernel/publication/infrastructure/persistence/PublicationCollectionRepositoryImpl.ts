import { IPublicationCollection } from '../../application/collection/IPublicationCollection'
import { AbstractOrmRepository } from '../../../../shared-kernel/infrastructure/prisma/AbstractOrmRepository'
import { GetPublicationCollectionQuery } from '../../application/use-cases/query/GetPublicationCollectionQuery'
import { PublicationSelectViewModel } from '../../application/view-models/PublicationSelectViewModel'
import { PublicationCollectionViewModel } from '../../application/view-models/PublicationCollectionViewModel'
import { PublicationStatus } from '../../domain/type/PublicationStatus'
import { GetPublicationCollectionByCategoryQuery } from '../../application/use-cases/query/GetPublicationCollectionByCategoryQuery'
import _ from 'lodash'
import { CollectionResponseType } from '../../../../shared-kernel/application/response/CollectionResponseType'

export class PublicationCollectionRepositoryImpl
    extends AbstractOrmRepository
    implements IPublicationCollection
{
    async collection(
        query: GetPublicationCollectionQuery
    ): Promise<CollectionResponseType<PublicationCollectionViewModel>> {
        let parameterQuery = ''

        if (query.query) {
            parameterQuery = parameterQuery.concat(
                `WHERE ${Object.entries(query.query).reduce(
                    (q: string, [key, value], index) =>
                        q.concat(
                            `${_.camelCase(key)} ILIKE '%${value}%' ${index < Object.entries(query.query ?? {}).length ? ', AND' : ''}`
                        ),
                    ''
                )} `
            )
        }

        if (query.order) {
            parameterQuery = parameterQuery.concat(
                ` ORDER BY ${Object.entries(query.order).reduce((q: string, [key, value], index) => q.concat(`${_.camelCase(key)} ${value} ${index < Object.entries(query.order ?? {}).length ? ', AND' : ''}`), '')} `
            )
        }

        console.log('parameters', parameterQuery)

        const results = await this.repositoryClient.$queryRaw`
            SELECT 
                p.id as id, p.title as title, "p"."authorId" as author_id, "p"."coverImageUrl" as cover_image_url, "p"."sellingPrice" as selling_price, p.status as status, p."createdAt" as created_at,
                pc.designation as category, 
                auth."firstName" || auth."lastName" as author
            FROM 
                    "Publication" AS p 
                JOIN
                    "PublicationCategory" AS pc ON p."categoryId" = pc.id 
                JOIN
                    "Author" AS auth ON p."authorId" = auth."id"
            LIMIT ${query.pagination.limit} 
                OFFSET ${query.getStartIndex()}
            `

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
                    total: await this.repositoryClient.publication.count(),
                },
            },
        }
    }

    async collectionForSelect(
        query: GetPublicationCollectionQuery
    ): Promise<CollectionResponseType<PublicationSelectViewModel>> {
        const results = await this.repositoryClient.publication.findMany({
            skip: query.getStartIndex(),
            take: query.pagination.limit,
            where: {
                title: {
                    startsWith: query.query?.title,
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
                    total: await this.repositoryClient.publication.count(),
                },
            },
        }
    }
    async collectionByCategory(
        query: GetPublicationCollectionByCategoryQuery
    ): Promise<CollectionResponseType<PublicationCollectionViewModel>> {
        const results = await this.repositoryClient.publication.findMany({
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
                    total: await this.repositoryClient.publication.count(),
                },
            },
        }
    }
}
