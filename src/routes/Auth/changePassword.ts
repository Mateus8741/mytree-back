import bcrypt from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '../../prisma/prisma-client'
import { ChangePasswordSchemna } from '../../schemas/changePasswordSchema'

export async function changePassword(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .patch('/change-password', {
        schema: {
            body: ChangePasswordSchemna,
            summary: 'Change user password',
            tags: ['User'],
        },
    }, async (request, reply) => {
        const { old_password, new_password } = request.body
        const userId = await request.getCurrentUserId();

        const user = await prisma.user.findUnique({
            where: { id: userId },
        })

        if (!user) {
            return reply.status(400).send({ message: 'Credenciais inválidas' })
        }

        const passwordMatch = await bcrypt.compare(old_password, user.password)

        if (!passwordMatch) {
            return reply.status(400).send({ message: 'Senha antiga inválida' })
        }

        const hashedPassword = await bcrypt.hash(new_password, 8)

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        })

        return { message: 'Password changed successfully' }
    })
}
