import { z } from 'zod';
import catchErrors from '../utils/catchErrors.utils';
import authService from '../services/auth.service';
import { HttpStatusCode } from '../types/error.type';
import cookiesUtils from '../utils/cookies.utils';

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
  const payload = registerSchema.parse({
    ...req.body,
    userAgent: req.headers['user-Agent'],
  });

  const { user, accessToken, refreshToken } = await authService.createAccount(
    payload
  );
  return cookiesUtils
    .setAuthCookies({ res, accessToken, refreshToken })
    .status(HttpStatusCode.Created)
    .json(user);
});
