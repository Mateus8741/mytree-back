import bcrypt from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { infer as ZodInfer } from 'zod'
import { prisma } from '../../prisma/prisma-client'
import { LoginSchema, type RegisterSchema } from '../../schemas/registerSchema'

export async function loginUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/login',
    {
      schema: {
        body: LoginSchema,
        summary: 'Login a user',
        tags: ['User'],
      },
    },
    async (request, reply) => {
      const { email, password } = request.body as ZodInfer<
        typeof RegisterSchema
      >

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (!user) {
        reply.status(401)
        return {
          error: 'Credenciais inválidas',
        }
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        reply.status(401)
        return {
          error: 'Credenciais inválidas',
        }
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          expiresIn: '600d',
        }
      )

      return reply.send({
        token,
        email: user.email,
      })
    }
  )
}
