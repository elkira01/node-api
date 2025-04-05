import { z } from 'zod'

export const registrationSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, 'Password should be have least 8 characters'),
})
