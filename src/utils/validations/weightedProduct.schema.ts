import { z } from 'zod';

export const weightSchema = z.object({
    bottom_out_force: z.object({
        value: z.number().min(1).max(2),
        attribute: z.enum(['cost', 'benefit'])
    }),
    actuation_travel: z.object({
        value: z.number().min(1).max(2),
        attribute: z.enum(['cost', 'benefit'])
    }),
    total_travel: z.object({
        value: z.number().min(1).max(2),
        attribute: z.enum(['cost', 'benefit'])
    }),
    lube_id: z.object({
        value: z.number().min(1).max(2),
        attribute: z.enum(['cost', 'benefit'])
    }),
    price: z.object({
        value: z.number().min(1).max(2),
        attribute: z.enum(['cost', 'benefit'])
    })
});

export const alternativeWeightSchema = z.object({
    bottom_out_force: z.object({
        c1: z.number(),
        c2: z.number(),
        c3: z.number(),
        c4: z.number()
    }),
    actuation_travel: z.object({
        c1: z.number(),
        c2: z.number(),
        c3: z.number()
    }),
    total_travel: z.object({
        c1: z.number(),
        c2: z.number(),
        c3: z.number()
    }),
    lube_id: z.object({
        c1: z.number(),
        c2: z.number()
    }),
    price: z.object({
        c1: z.number(),
        c2: z.number(),
        c3: z.number(),
        c4: z.number()
    })
});

export const typeSchema = z.number();
export type weightSchemaType = z.infer<typeof weightSchema>;
export type alternativeWeightSchemaType = z.infer<typeof alternativeWeightSchema>;
export type typeSchemaType = z.infer<typeof typeSchema>;
