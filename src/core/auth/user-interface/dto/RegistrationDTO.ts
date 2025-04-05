import { IUser } from '../../domain/models'

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
}
