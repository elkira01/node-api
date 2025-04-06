import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

export function authenticateAccessToken() {
    return (req: any, resp: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]

            if (!token) {
                resp.status(401).json({ error: 'Unauthorized', status: 401 })
            } else
                jwt.verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET as any,
                    (err: any, decoded: any) => {
                        if (err) {
                            return resp.status(403).send({
                                error: 'Forbidden',
                                status: StatusCodes.FORBIDDEN,
                            })
                        }
                        req.user = decoded
                        next()
                    }
                )
        } catch (err: any) {
            resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: 500,
                details: err,
            })
        }
    }
}

export function authenticateRefreshToken() {
    return (req: any, resp: Response, next: NextFunction) => {
        try {
            const { refreshToken: token } = req.body

            if (!token) {
                resp.status(401).json({ error: 'Unauthorized', status: 401 })
            } else
                jwt.verify(
                    token,
                    process.env.REFRESH_TOKEN_SECRET as any,
                    (err: any, decoded: any) => {
                        if (err) {
                            return resp.status(403).send({
                                error: 'Forbidden',
                                status: StatusCodes.FORBIDDEN,
                            })
                        }
                        req.user = decoded
                        return next()
                    }
                )
        } catch (err: any) {
            resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: 500,
                details: err,
            })
        }
    }
}
