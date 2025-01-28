import catchErrors from '../../utils/catchErrors.utils';
import authService from '../../services/auth.service';
import { HttpStatusCode } from '../../constants/error.constants';
import cookiesUtils from '../../utils/cookies.utils';
import { loginSchema, registerSchema } from './auth.schemas';

const register = catchErrors(async (req, res) => {
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

export const login = catchErrors(async (req, res) => {
  const payload = loginSchema.parse({
    ...req.body,
    userAgent: req.headers['user-Agent'],
  });

  const { user, accessToken, refreshToken } = await authService.login(payload);

  return cookiesUtils
    .setAuthCookies({ res, accessToken, refreshToken })
    .status(HttpStatusCode.OK)
    .json(user);
});

export default { register, login };
