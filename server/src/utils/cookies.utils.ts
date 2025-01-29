import { CookieOptions, Response } from 'express';
import dateUtils from './date.utils';

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const enum CookieKeys {
  RefreshToken = 'refreshToken',
  AccessToken = 'accessToken',
}

export const REFRESH_PATH = '/auth/refresh';
const secure = process.env.PROD !== 'false'; //when in development, secure should be false

const defaults: CookieOptions = {
  sameSite: 'strict',
  httpOnly: true,
  secure,
};
//AccessToken 15 minutes
const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: dateUtils.fifteenMinutesFromNowInMS(),
});

//RefreshToken 30 days
const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: dateUtils.thirtyDaysFromNowInMS(),
  path: REFRESH_PATH, //send refresh token only when request have this path
});

const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie(CookieKeys.AccessToken, accessToken, getAccessTokenCookieOptions())
    .cookie(
      CookieKeys.RefreshToken,
      refreshToken,
      getRefreshTokenCookieOptions()
    );

const clearAuthCookies = (res: Response) =>
  res.clearCookie(CookieKeys.AccessToken).clearCookie(CookieKeys.RefreshToken, {
    path: REFRESH_PATH,
  });

export default {
  setAuthCookies,
  clearAuthCookies,
  getRefreshTokenCookieOptions,
  getAccessTokenCookieOptions,
};
