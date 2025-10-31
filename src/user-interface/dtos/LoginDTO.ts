import { IUser } from '../../kernel/auth/domain/entities'

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
