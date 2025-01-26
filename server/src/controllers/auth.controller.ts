import { z } from 'zod';
import catchErrors from '../utils/catchErrors';

const registerSchema = z
  .object({
    email: z.string().email().min(6).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const register = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers['user-Agent'],
  });
  res.status(200).json({ message: 'Register' });
});
