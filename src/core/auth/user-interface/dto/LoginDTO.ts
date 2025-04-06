import { IUser } from '../../domain/models'

export class LoginDTO {
    private readonly payload: IUser

    constructor(data: any) {
        this.payload = data
    }

    get in() {
        return {}
    }
}
