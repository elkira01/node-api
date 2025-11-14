import { IAuthorCollection } from '../../application/collection/IAuthorCollection'
import { GetAuthorCollectionQuery } from '../../application/use-cases/query/GetAuthorCollectionQuery'
import { AbstractOrmRepository } from '../../../../shared-kernel/infrastructure/orm/AbstractOrmRepository'
import { AuthorCollectionViewModel } from '../../application/view-models/AuthorCollectionViewModel'
import { AuthorSelectViewModel } from '../../application/view-models/AuthorSelectViewModel'

export class AuthorCollectionRepositoryImpl
    extends AbstractOrmRepository
    implements IAuthorCollection
{
    async collection(
        query: GetAuthorCollectionQuery
    ): Promise<AuthorCollectionViewModel[]> {
        const results = await this.repositoryClient.author.findMany({
            skip: query.getStartIndex(),
            take: query.limit,
            where: {
                firstName: {
                    startsWith: query.q,
                    mode: 'insensitive',
                },
                lastName: {
                    startsWith: query.q,
                    mode: 'insensitive',
                },
            },
        })

        return results.map(
            (item) =>
                new AuthorCollectionViewModel(
                    item.id,
                    item.firstName,
                    item.createdAt,
                    item.lastName,
                    item.email,
                    item.pictureUrl
                )
        )
    }

    async collectionForSelect(
        query: GetAuthorCollectionQuery
    ): Promise<AuthorSelectViewModel[]> {
        const results = await this.repositoryClient.author.findMany({
            skip: query.getStartIndex(),
            take: query.limit,
            where: {
                firstName: {
                    startsWith: query.q,
                    mode: 'insensitive',
                },
                lastName: {
                    startsWith: query.q,
                    mode: 'insensitive',
                },
            },
        })

        return results.map(
            (item) =>
                new AuthorSelectViewModel(
                    item.id,
                    `${item.firstName} ${item.lastName}`
                )
        )
    }
}
