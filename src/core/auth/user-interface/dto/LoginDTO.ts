import { IUser } from '../../domain/entities'

export class LoginDTO {
    private readonly payload: IUser

    constructor(data: any) {
        this.payload = data
    }

    get in() {
        return {
            email: this.payload.email,
            password: this.payload.password,
        }
    }
}
