import { z } from 'zod';

const UrlSchema = z.object({
    urlContent: z.string().url(),
    contentName: z.string(),
    isActived: z.boolean().default(true),
    order: z.number().default(0),
})

const UpdateUrlSchema = UrlSchema.partial();

export { UpdateUrlSchema, UrlSchema };

