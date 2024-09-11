import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '../../prisma/prisma-client'
import { UrlSchema } from '../../schemas/urlSchema'

export async function createContentLinks(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/content', {
      schema: {
        body: UrlSchema
      },
    }, async (request, reply) => {
      try {
        const { urlContent, contentName, isActived, order } = request.body
        const userId = await request.getCurrentUserId();

        const url = await prisma.content.create({
          data: {
            urlContent,
            contentName,
            isActived,
            order,
            userId,
          },
        })

        return reply.status(201).send(url)
      } catch (error) {
        console.error('Error creating url:', error)

        return reply.status(500).send({
          message: 'Internal Server Error',
        })
      }
    })
}
