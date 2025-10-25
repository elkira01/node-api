import { IUser } from '../../domain/entities'

export class RegistrationDTO {
    private readonly payload: IUser

    constructor(data: any) {
        this.payload = data
    }

    get in() {
        return {
            name: this.payload.name,
            email: this.payload.email,
            password: this.payload.password,
        }
    }

    get out() {
        return {
            id: this.payload.id,
        }
    }
}
