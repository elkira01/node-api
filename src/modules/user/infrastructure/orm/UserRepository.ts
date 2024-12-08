import {IUserRepository} from "../../core/repositories/IUserRepository";
import {IUser} from "../../core/models/IUser";
import {PrismaClient} from "@prisma/client";
import {Service} from "typedi";

@Service()
export class UserRepository implements IUserRepository {
    protected prismaClient: any

    constructor() {
        this.prismaClient = new PrismaClient();
    }
    create(data: IUser): Promise<any> {
        return this.prismaClient.user.create({
            data,
        });
    }

    delete(id: any): Promise<void> {
        return this.prismaClient.user.delete({
            where: {
                id,
            },
        });
    }

    findAll(): Promise<IUser[]> {
        return this.prismaClient.user.findMany();
    }

    findById(id: any): Promise<IUser | null> {
        return this.prismaClient.user.findUnique({
            where: {
                id,
            },
        });
    }

    update(id: any, data: Partial<IUser>): Promise<any> {
        return this.prismaClient.user.update({
            where: {
                id,
            },
            data,
        });
    }

}