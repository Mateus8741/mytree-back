import { z } from 'zod'

const ChangePasswordSchemna = z.object({
    old_password: z.string().min(8),
    new_password: z.string().min(8),
})

export { ChangePasswordSchemna }

