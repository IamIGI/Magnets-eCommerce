import catchErrors from '../../utils/catchErrors.utils';
import authService from '../../services/auth.service';
import { HttpStatusCode } from '../../constants/error.constants';
import cookiesUtils from '../../utils/cookies.utils';
import { loginSchema, registerSchema } from './auth.schemas';
import jwtUtils from '../../utils/jwt.utils';
import SessionModel from '../../models/Session.model';

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

export const logout = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = jwtUtils.verifyToken(accessToken);

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  return cookiesUtils.clearAuthCookies(res).status(HttpStatusCode.OK).json({
    message: 'Logout successful',
  });
});

export default { register, login, logout };
