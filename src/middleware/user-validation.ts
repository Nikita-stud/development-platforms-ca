import { z } from 'zod';

export const requiredUserDataSchema = z.object({
  email: z.email('Email must be a valid email'),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      'Password must be at least 1 characters long and include uppercase, lowercase, number, and a special character'
    ),
});
