import { IUserSessionRepository } from '../../auth/domain/repositories'

export class UserSessionService {
    private sessionRepo: IUserSessionRepository

    constructor(userRepo: IUserSessionRepository) {
        this.sessionRepo = userRepo
    }

    async createSession(userId: any, token: any) {
        return this.sessionRepo.save({
            userId: userId,
            refreshToken: token,
            hasExpired: 0,
        })
    }

    async cancelSession(token: any) {
        let session = this.sessionRepo.findByToken(token)

        if (!session) throw new Error('Something went wrong')
        else {
            return this.sessionRepo.save({ ...session, hasExpired: 1 })
        }
    }
}
