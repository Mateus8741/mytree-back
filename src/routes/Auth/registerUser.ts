import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { RegisterSchema } from '../../schemas/registerSchema'

export async function registerUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/register',
    {
      schema: {
        body: RegisterSchema,
      },
    },
    async (request, reply) => {
      const { email, password } = request.body
      console.log(email, password)
      reply.send({ email, password })
    }
  )
}
