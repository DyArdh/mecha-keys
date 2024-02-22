import { z } from 'zod';

export const switchSchema = z.object({
    name: z.string({ required_error: 'Name is required', invalid_type_error: 'Name must be a string' }).max(50, {
        message: 'Name must be less than or equal to 50 characters'
    }),
    mount_id: z.number({ required_error: 'Mount is required', invalid_type_error: 'Mount must be a number' }),
    type_id: z.number({ required_error: 'Type is required', invalid_type_error: 'Type must be a number' }),
    bottom_out_force: z.number({
        required_error: 'Bottom out force is required',
        invalid_type_error: 'Bottom out force must be a number'
    }),
    actuation_force: z.number({ invalid_type_error: 'Actuation force must be a number' }).optional(),
    actuation_travel: z.number({
        required_error: 'Actuation travel is required',
        invalid_type_error: 'Actuation travel must be a number'
    }),
    total_travel: z.number({
        required_error: 'Total travel is required',
        invalid_type_error: 'Total travel must be a number'
    }),
    top_housing: z
        .string({ required_error: 'Top housing is required', invalid_type_error: 'Top housing must be a string' })
        .max(50, { message: 'Top housing must be less than or equal to 50 characters' }),
    stem: z
        .string({ required_error: 'Stem is required', invalid_type_error: 'Stem must be a string' })
        .max(50, { message: 'Stem must be less than or equal to 50 characters' }),
    bottom_housing: z
        .string({ required_error: 'Bottom housing is required', invalid_type_error: 'Bottom housing must be a string' })
        .max(50, { message: 'Bottom housing must be less than or equal to 50 characters' }),
    lube_id: z.number({ required_error: 'Lube is required', invalid_type_error: 'Lube must be a number' }),
    price: z.number({ required_error: 'Price is required', invalid_type_error: 'Price must be a number' })
});

export type switchSchemaType = z.infer<typeof switchSchema>;
