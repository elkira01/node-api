import { IUserSession } from '../../../auth/domain/entities'

export interface IUserSessionRepository {
    save(payload: Partial<IUserSession>): Promise<any>
    findByToken(payload: any): Promise<IUserSession | null>
}
