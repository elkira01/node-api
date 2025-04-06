import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

export function authenticateToken() {
    return (req: any, resp: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return resp.status(401).json({ error: 'Unauthorized', status: 401 })
        }

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as any,
            (err: any, decoded: any) => {
                if (err) {
                    return resp
                        .status(401)
                        .json({ error: 'Unauthorized', status: 401 })
                }
                req.user = decoded
                next()
            }
        )
    }
}
