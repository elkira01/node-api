import { IAuthorCollection } from '../../application/collection/IAuthorCollection'
import { GetAuthorCollectionQuery } from '../../application/use-cases/query/GetAuthorCollectionQuery'
import { IAuthorReadModel } from '../../application/read-models/IAuthorReadModel'
import { GetAuthorQuery } from '../../application/use-cases/query/GetAuthorQuery'
import { AuthorViewModel } from '../../application/view-models/AuthorViewModel'
import { Author } from '../../core/entity/Author'
import { AuthorType } from '../../core/type/AuthorType'
import { AbstractOrmRepository } from '../../../../shared-kernel/infrastructure/prisma/AbstractOrmRepository'

export class AuthorReadModelRepositoryImpl
    extends AbstractOrmRepository
    implements IAuthorReadModel
{
    constructor() {
        super()
    }
    async viewAuthor(query: GetAuthorQuery): Promise<AuthorViewModel | null> {
        const author = await this.entityManager.author.findUnique({
            where: { id: query.authorId },
            include: { publications: true },
        })

        if (author?.id) {
            return Promise.resolve(
                new AuthorViewModel(
                    author.id,
                    author.firstName,
                    author.lastName,
                    author.authorType as AuthorType,
                    author.publications.map((publication) => ({
                        id: publication.id,
                        title: publication.title,
                        coverImageUrl: publication.coverImageUrl,
                        sellingPrice:
                            publication.sellingPrice as unknown as number,
                    })),
                    author.email,
                    author.pictureUrl,
                    author.biography,
                    author.createdAt
                )
            )
        }
        return Promise.resolve(null)
    }
}
