import bcrypt from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '../../prisma/prisma-client'
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
      try {
        const { email, password, name } = request.body

        const alreadyExistsSameEmail = await prisma.user.findFirst({
          where: {
            email,
          },
        })

        if (alreadyExistsSameEmail) {
          return reply.status(400).send({
            message: 'Email already exists',
          })
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name,
          },
        })

        return reply.status(201).send({
          message: 'User registered successfully',
        })
      } catch (error) {
        console.error('Error registering user:', error)

        return reply.status(500).send({
          message: 'Internal Server Error',
        })
      }
    }
  )
}
