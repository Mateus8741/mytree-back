import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma/prisma-client';

export async function getContentLinks(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/content', {
      schema: {
        summary: 'Get content links',
        tags: ['Content'],
      },
    }, async (request, reply) => {
        try {
            const userId = await request.getCurrentUserId();
    
            const content = await prisma.content.findMany({
                where: {
                    userId,
                },
            })
    
            return reply.send(content)
            
        } catch (error) {
            console.error('Error getting content:', error)
    
            return reply.status(500).send({
                message: 'Internal Server Error',
            })
        }
    })
}
