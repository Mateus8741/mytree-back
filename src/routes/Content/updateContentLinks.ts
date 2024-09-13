import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { type infer as ZodInfer, z } from 'zod'
import { prisma } from '../../prisma/prisma-client'
import { UpdateUrlSchema, type UrlSchema } from '../../schemas/urlSchema'

export async function updateContentLinks(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/content/:id',
    {
      schema: {
        summary: 'Update content links',
        tags: ['Content'],
        body: UpdateUrlSchema,
        params: z.object({
          id: z.string().cuid(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const userId = await request.getCurrentUserId()

        if (!userId) {
          return reply.status(401).send({
            message: 'Usuário não autorizado',
          })
        }

        const { id } = request.params
        const { contentName, isActived, order, urlContent } =
          request.body as ZodInfer<typeof UrlSchema>

        const content = await prisma.content.update({
          where: { id },
          data: {
            contentName,
            isActived,
            order,
            urlContent,
          },
        })

        const message = 'Conteudo atualizado com sucesso!'
        return reply.send({ message, content })
      } catch (error) {
        console.error('Erro ao atualizar conteúdo:', error)

        return reply.status(500).send({
          message: 'Erro interno do servidor',
        })
      }
    }
  )
}
