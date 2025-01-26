import { CookieOptions, Response } from 'express';
import dateUtils from './date.utils';

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

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
  path: '/auth/refresh', //send refresh token only when request have this path
});

const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
    .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());

export default {
  setAuthCookies,
};
