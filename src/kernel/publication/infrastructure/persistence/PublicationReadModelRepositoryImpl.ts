import { AbstractOrmRepository } from '../../../../shared-kernel/infrastructure/prisma/AbstractOrmRepository'
import { PublicationStatus } from '../../domain/type/PublicationStatus'
import { IPublicationReadModel } from '../../application/read-model/IPublicationReadModel'
import { GetPublicationQuery } from '../../application/use-cases/query/GetPublicationQuery'
import {
    BookViewModel,
    MagazineViewModel,
} from '../../application/view-models/PublicationViewModel'
import { NotFoundException } from '../../../../shared-kernel/domain/NotFoundException'

export class PublicationReadModelRepositoryImpl
    extends AbstractOrmRepository
    implements IPublicationReadModel
{
    async viewBook(query: GetPublicationQuery): Promise<BookViewModel> {
        const results = await this.entityManager.$queryRaw`
                SELECT p.id AS id, 
                       p.title as title, 
                       p."authorId" as "authorId",
                       p."categoryId" as category_id,
                       p.resume as resume,
                       p."coverImageUrl" as cover_image_url,
                       p."contentFileUrl" as content_file_url,
                       p."sellingPrice" as selling_price,
                       p."rentalPrice" as rental_price,
                       p."rentalPeriod" as rental_period,
                       p."createdAt" as created_at,
                       p."updatedAt" as updated_at,
                       p."type" as type,
                       p."status" as status, 
                       auth."firstName" as first_name,
                       auth."lastName" as last_name,
                       cat.designation as category_name 
                FROM "Publication" AS p 
                    JOIN "PublicationCategory" AS cat ON "p"."categoryId" = "cat".id 
                    JOIN "Author" AS auth ON "p"."authorId" = "auth"."id" 
                WHERE "p".type = 'BOOK'::"PublicationType"
                    AND "p".id = ${query.publicationId}`

        const item = (results as any[])?.at(0)

        return item?.id
            ? new BookViewModel(
                  item.id,
                  item.title,
                  item.authorId,
                  `${item.first_name} ${item.last_name}`,
                  item.category_id,
                  item.category_name,
                  item.resume,
                  item.cover_image_url,
                  item.content_file_url,
                  item.selling_price as unknown as number,
                  item.rental_price as unknown as number,
                  item.rental_period,
                  item.status as PublicationStatus,
                  item.created_at,
                  item.updated_at
              )
            : Promise.reject(new NotFoundException('Book not found'))
    }

    async viewMagazine(query: GetPublicationQuery): Promise<MagazineViewModel> {
        const results = await this.entityManager.$queryRaw`
                SELECT p.id AS id, 
                       p.title as title, 
                       p."authorId" as author_id,
                       p."categoryId" as category_id,
                       p.resume as resume,
                       p."coverImageUrl" as cover_image_url,
                       p."contentFileUrl" as content_file_url,
                       p."sellingPrice" as selling_price,
                       p."rentalPrice" as rental_price,
                       p."rentalPeriod" as rental_period,
                       p."createdAt" as created_at,
                       p."updatedAt" as updated_at,
                       p."type" as type,
                       p."status" as status, 
                       auth."firstName" as first_name,
                       auth."lastName" as last_name,
                       cat.designation as category_name 
                FROM "Publication" AS p 
                    JOIN "PublicationCategory" AS cat ON "p"."categoryId" = "cat".id 
                    JOIN "Author" AS auth ON "p"."authorId" = "auth"."id" 
                WHERE "p".type = 'MAGAZINE'::"PublicationType"
                    AND "p".id = ${query.publicationId}`

        const item = (results as any[])?.at(0)

        return item?.id
            ? new MagazineViewModel(
                  item.id,
                  item.title,
                  `${item.first_name} ${item.last_name}`,
                  item.category_id,
                  item.category_name,
                  item.resume,
                  item.cover_image_url,
                  item.content_file_url,
                  item.selling_price as unknown as number,
                  item.rental_price as unknown as number,
                  item.rental_period,
                  item.status as PublicationStatus,
                  item.created_at,
                  item.updated_at
              )
            : Promise.reject(new NotFoundException('Magazine not found'))
    }
}
