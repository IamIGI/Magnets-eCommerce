import catchErrors from '../../utils/catchErrors.utils';
import authService from '../../services/auth.service';
import { HttpStatusCode } from '../../constants/error.constants';
import cookiesUtils, { CookieKeys } from '../../utils/cookies.utils';
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationCodeSchema,
} from './auth.schemas';
import jwtUtils from '../../utils/jwt.utils';
import SessionModel from '../../models/Session.model';
import appAssert from '../../utils/appErrorAssert.utils';

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

  const { accessToken, refreshToken } = await authService.login(payload);

  return cookiesUtils
    .setAuthCookies({ res, accessToken, refreshToken })
    .status(HttpStatusCode.OK)
    .json({ message: 'Login successfully' });
});

export const logout = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  const { payload } = jwtUtils.verifyToken(accessToken || '');

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  return cookiesUtils.clearAuthCookies(res).status(HttpStatusCode.OK).json({
    message: 'Logout successful',
  });
});

export const refresh = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, HttpStatusCode.Unauthorized, 'Missing refresh token');

  const { accessToken, newRefreshToken } =
    await authService.refreshUserAccessToken(refreshToken);

  if (newRefreshToken) {
    res.cookie(
      CookieKeys.RefreshToken,
      newRefreshToken,
      cookiesUtils.getRefreshTokenCookieOptions()
    );
  }
  return res
    .status(HttpStatusCode.OK)
    .cookie(
      CookieKeys.AccessToken,
      accessToken,
      cookiesUtils.getAccessTokenCookieOptions()
    )
    .json({
      message: 'Access token refreshed',
    });
});

export const verifyEmail = catchErrors(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params.code);

  await authService.verifyEmail(verificationCode);

  res.status(HttpStatusCode.OK).json({
    message: 'Email was successfully verified',
  });
});

export const sendPasswordReset = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);

  await authService.sendPasswordResetEmail(email);
  res.status(HttpStatusCode.OK).json({ message: 'Password reset email sent' });
});

export const resetPassword = catchErrors(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);

  await authService.resetPassword(request);

  return cookiesUtils
    .clearAuthCookies(res)
    .status(HttpStatusCode.OK)
    .json({ message: 'Password reset successful' });
});

export default {
  register,
  login,
  logout,
  refresh,
  verifyEmail,
  sendPasswordReset,
  resetPassword,
};
