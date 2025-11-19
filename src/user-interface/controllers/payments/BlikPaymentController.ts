import { Request, Response } from 'express'
import { AppAbstractController } from '../../../shared-kernel/user-interface/controller/AppAbstractController'
import jwt from 'jsonwebtoken'

export class BlikPaymentController extends AppAbstractController {
    createSession = this.asyncHandler(async (req: Request, res: Response) => {
        const payload = req.body

        const token = jwt.sign(
            {
                ...payload,
                method: 'blik',
                methodOptions: {
                    blikCode: '777123',
                },
            },
            process.env.MONTONIO_SECRET_KEY as string,
            { algorithm: 'HS256', expiresIn: '10m' }
        )

        const response = await fetch('https://stargate.montonio.com/api/orders', {
            method: 'POST',
            body: JSON.stringify({ token })
        })

       if (response.ok){
          res.status(201).json(response)
       }
    })
}
