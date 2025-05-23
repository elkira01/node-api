import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'
import { StatusCodes } from 'http-status-codes'

export function validateData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.message}`,
                }))
                res.status(StatusCodes.BAD_REQUEST).json({
                    status: StatusCodes.BAD_REQUEST,
                    error: 'Invalid data',
                    details: errorMessages,
                })
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                    error: 'Internal Server Error',
                })
            }
        }
    }
}
