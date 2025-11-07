import { AbstractCollectionQuery } from '../../../../../shared-kernel/application/query/AbstractCollectionQuery'
import { AbstractOrmRepository } from '../../../../../shared-kernel/infrastructure/orm/AbstractOrmRepository'
import { IAuthorRepository } from '../../../core/repository/IAuthorRepository'
import { AuthorType } from '../../../core/type/AuthorType'
import { Author } from '../../../core/entity/Author'

export class AuthorEntityRepositoryImpl
    extends AbstractOrmRepository
    implements IAuthorRepository
{
    constructor() {
        super()
    }

    async collection(query: AbstractCollectionQuery): Promise<any> {
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

        return { data: results }
    }

    async find(key: string, value: any): Promise<Author | null> {
        const resp = await this.repositoryClient.author.findUnique({
            where: { [key]: value } as any,
        })

        if (resp?.id) {
            return Promise.resolve(
                new Author(
                    resp.id,
                    resp.authorType as AuthorType,
                    resp.firstName,
                    resp.lastName ?? '',
                    resp.biography,
                    resp.email as any,
                    resp.pictureUrl as any,
                    resp.createdAt,
                    resp.updatedAt
                )
            )
        }
        return Promise.resolve(null)
    }

    async save(payload: Author): Promise<void> {
        !payload.getId()
            ? await this.repositoryClient.author.create({
                  data: {
                      firstName: payload.getFirstName(),
                      lastName: payload.getLastName(),
                      authorType: payload.getType() as any,
                      biography: payload.getBiography(),
                      email: payload.getEmail(),
                      pictureUrl: payload.getProfileImageUrl(),
                  },
              })
            : await this.repositoryClient.author.update({
                  where: { id: payload.getId() },
                  data: {
                      firstName: payload.getFirstName(),
                      lastName: payload.getLastName(),
                      authorType: payload.getType() as any,
                      biography: payload.getBiography(),
                      email: payload.getEmail(),
                      pictureUrl: payload.getProfileImageUrl(),
                  },
              })
    }

    async delete(id: any): Promise<void> {
        await this.repositoryClient.author.delete({
            where: { id: id },
        })
    }

    async update(payload: Author): Promise<void> {}
}
