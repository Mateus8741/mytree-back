import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../prisma/prisma-client'

export async function deleteContentLinks(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/content/:contentId', {
        schema: {
            summary: 'Delete content links',
            tags: ['Content'], 
            params: z.object({
                contentId: z.string().cuid(),
            }),
        },
    }, async (request, reply) => {
        const { contentId } = request.params
        const userId = await request.getCurrentUserId()

        if (!userId) {
            return reply.status(401).send({ error: "Usuário não autenticado" });
        }

        const content = await prisma.content.findFirst({
            where: { id: contentId },
        })

        if (!content) {
            return reply.status(404).send({ error: "Conteúdo não encontrado" });
        }

        if (content.userId !== userId) {
            return reply.status(403).send({ error: "Você não tem permissão para deletar este pedido" });
        }

        await prisma.content.deleteMany({
            where: { id: contentId },
        })

        return reply.status(204).send({ message: "Pedido deletado com sucesso!" });
    })
}
