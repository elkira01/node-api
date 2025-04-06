import { IUser } from '../../domain/entities'

export class UserDto {
    private data: Partial<IUser>

    constructor(data: Partial<IUser>) {
        this.data = data
    }

    get fromUser() {
        return this.data as IUser
    }
}
