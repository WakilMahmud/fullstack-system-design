import { z } from 'zod';

const userValidationSchema = z.object({
    email: z.email()
});

export const UserValidation = {
    userValidationSchema
};