import { Request, Response } from 'express'
import { AppAbstractController } from '../../../shared-kernel/user-interface/controller/AppAbstractController'
import { Stripe } from 'stripe'

export class StripeController extends AppAbstractController {
    createSession = this.asyncHandler(async (req: Request, res: Response) => {
        const _stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {})

        const session = await _stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Local Test',
                        },
                        unit_amount: 50,
                    },
                    quantity: 2,
                },
            ],
            mode: 'payment',
            ui_mode: 'custom',
            payment_method_types: ['card'],

            return_url:
                'http://dev.iderma.eu/return?session_id={CHECKOUT_SESSION_ID}',
        })

        res.status(201).json({
            checkoutSessionClientSecret: session.client_secret,
        })
    })
}
