import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { SessionDocument } from '../models/Session.model';
import { UserDocument } from '../models/User.model';
import envConstants from '../constants/env.constants';

export type RefreshTokenPayload = {
  sessionId: SessionDocument['_id'];
};

export type AccessTokenPayload = {
  userId: UserDocument['_id'];
  sessionId: SessionDocument['_id'];
};

type SignOptionsAndSecret = SignOptions & { secret: string };

const defaults: SignOptions = {
  audience: ['user'],
};

const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: '15m',
  secret: envConstants.JWT_SECRET,
};

const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: '30d',
  secret: envConstants.JWT_REFRESH_SECRET,
};

function signToken(
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
) {
  const { secret, ...signOpts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, { ...defaults, ...signOpts });
}

//get provided type (object must be), otherwise get the AccessTokenPayload type
function verifyToken<TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) {
  const { secret = envConstants.JWT_SECRET, ...verifyOpts } = options || {};
  try {
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...verifyOpts,
    }) as TPayload;

    return {
      payload,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

export default {
  signToken,
  refreshTokenSignOptions,
  verifyToken,
};
