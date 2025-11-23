import { AbstractCollectionQuery } from '../../../../shared-kernel/application/query/AbstractCollectionQuery'
import { AbstractOrmRepository } from '../../../../shared-kernel/infrastructure/prisma/AbstractOrmRepository'
import { IAuthorRepository } from '../../core/repository/IAuthorRepository'
import { AuthorType } from '../../core/type/AuthorType'
import { Author } from '../../core/entity/Author'

export class AuthorEntityRepositoryImpl
    extends AbstractOrmRepository
    implements IAuthorRepository
{
    async findByKey(key: string, value: any): Promise<Author | null> {
        const resp = await this.entityManager.author.findUnique({
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

    async save(payload: Author): Promise<any> {
        const author = !payload.getId()
            ? await this.entityManager.author.create({
                  data: {
                      firstName: payload.getFirstName(),
                      lastName: payload.getLastName(),
                      authorType: payload.getType() as any,
                      biography: payload.getBiography(),
                      email: payload.getEmail(),
                      pictureUrl: payload.getProfileImageUrl(),
                  },
              })
            : await this.entityManager.author.update({
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

        return author.id
    }

    async delete(id: any): Promise<void> {
        await this.entityManager.author.delete({
            where: { id: id },
        })
    }
}
