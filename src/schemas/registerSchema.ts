import { z } from 'zod'

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3),
})

const LoginSchema = RegisterSchema.partial()

export { LoginSchema, RegisterSchema }

