import { z } from 'zod'

export const registrationSchema = z
    .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
    })
    .required()
