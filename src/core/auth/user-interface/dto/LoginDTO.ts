import { IUser } from '../../domain/models'

export class LoginDTO {
    private readonly payload: Partial<IUser>

    constructor(data: Partial<IUser>) {
        this.payload = data
    }

    get validated() {
        return {

        }
    }
}
