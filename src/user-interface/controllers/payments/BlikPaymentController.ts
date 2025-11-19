import { Request, Response } from 'express'
import { AppAbstractController } from '../../../shared-kernel/user-interface/controller/AppAbstractController'
import jwt from 'jsonwebtoken'

function generateSignature(data: any, secretKey: any) {
    return jwt.sign(data, secretKey, {
        algorithm: 'HS256',
        expiresIn: '1h',
    })
}

export class BlikPaymentController extends AppAbstractController {
    MONTONIO_CONFIG = {
        accessKey: process.env.MONTONIO_ACCESS_KEY,
        secretKey: process.env.MONTONIO_SECRET_KEY,
        environment:
            process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
        apiUrl:
            process.env.NODE_ENV === 'production'
                ? 'https://stargate.montonio.com/api'
                : 'https://sandbox-stargate.montonio.com/api',
    }

    createOrder = this.asyncHandler(async (req: Request, res: Response) => {
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

        const response = await fetch(
            'https://stargate.montonio.com/api/orders',
            {
                method: 'POST',
                body: JSON.stringify({ token }),
            }
        )

        if (response.ok) {
            res.status(201).json(response)
        }
    })

    createSession = this.asyncHandler(async (req: Request, res: Response) => {
        try {
            const payload = req.body

            if (payload.currency !== 'PLN') {
                return res.status(400).json({
                    error: 'BLIK payments only accept PLN currency',
                })
            }

            const sessionData = {
                access_key: this.MONTONIO_CONFIG.accessKey,
                currency: payload.currency,
                amount: payload.amount ?? 5,
                preselected_country: payload.preselectedCountry || 'PL',
                preselected_locale: 'pl',
            }

            const signature = generateSignature(
                sessionData,
                this.MONTONIO_CONFIG.secretKey
            )

            console.log(signature)

            const response = await fetch(
                `${this.MONTONIO_CONFIG.apiUrl}/sessions`,
                {
                    method: 'post',
                    body: JSON.stringify({ data: sessionData }),
                    headers: {
                        Authorization: `Bearer ${signature}`,
                        'Content-Type': 'application/json',
                    },
                }
            )

            const data = await response.json()

            if (!response.ok) {
                console.error(data)

                return res.json(data)
            }

            res.status(201).json({
                success: true,
                sessionUuid: data.uuid,
                sessionToken: data.session_token,
            })
        } catch (error) {
            console.error('Internal server error', error)
            return res.status(500).json({ error })
        }
    })
}
