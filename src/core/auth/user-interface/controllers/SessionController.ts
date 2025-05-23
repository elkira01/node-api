import { IUserSessionRepository } from '@core/auth/domain/repositories'
import { UserSessionService } from '@core/auth/services'

export class SessionController {
    protected userSessionService: UserSessionService

    constructor(sessionRepo: IUserSessionRepository) {
        this.userSessionService = new UserSessionService(sessionRepo)
    }

    // async create(req: Request, res: Response) {
    //     let { id, token } = req.body
    //
    //     if (id && token) {
    //         try {
    //             let resp = await this.userSessionService.createSession(
    //                 id,
    //                 token
    //             )
    //         } catch (error) {
    //             res.sendStatus(500)
    //         }
    //     }
    // }
}
