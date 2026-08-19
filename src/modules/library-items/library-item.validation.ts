import { z } from 'zod';

export const createLibraryItemSchema = z.object({
  type: z.enum(['TOOL', 'API', 'WEBSITE', 'RESOURCE']),
  name: z.string().min(1),
  description: z.string().optional(),
  url: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
});

export const updateLibraryItemSchema = createLibraryItemSchema.partial();
