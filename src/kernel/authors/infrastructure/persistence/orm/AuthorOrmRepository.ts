import { AbstractOrmRepository } from '@shared/infrastructure/orm/AbstractOrmRepository'
import { AbstractCollectionQuery } from '@shared/application/query/AbstractCollectionQuery'
import { IAuthorRepository } from '@app/authors/core/repository/IAuthorRepository'
import { Author } from '@app/authors/core/entity/Author'
import { AuthorType } from '@app/authors/core/type/AuthorType'

export class AuthorOrmRepository
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

    async findById(id: any): Promise<Author | null> {
        const resp = await this.repositoryClient.author.findUnique({
            where: { id: id },
        })

        if (resp) {
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

    async findByEmail(email: string): Promise<Author | null> {
        const resp = await this.repositoryClient.author.findUnique({
            where: { email: email },
        })

        if (resp) {
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

    async create(payload: Author): Promise<any> {
        const result = await this.repositoryClient.author.create({
            data: {
                firstName: payload.getFirstName(),
                lastName: payload.getLastName(),
                authorType: payload.getType() as any,
                biography: payload.getBiography(),
                email: payload.getEmail(),
                pictureUrl: payload.getProfileImageUrl(),
            },
        })
        return result.id
    }

    async delete(id: any): Promise<void> {
        await this.repositoryClient.author.delete({
            where: { id: id },
        })
    }

    async update(payload: Author): Promise<void> {
        await this.repositoryClient.author.update({
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
}
