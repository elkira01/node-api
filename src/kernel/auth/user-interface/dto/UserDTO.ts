import { IUser } from '../../domain/entities'

export class UserDTO {
    private payload: IUser

    constructor(data: any) {
        this.payload = data
    }

    get out() {
        return {
            id: this.payload.id,
            email: this.payload.email,
            name: this.payload.name,
            createdAt: this.payload.createdAt,
        }
    }
}
