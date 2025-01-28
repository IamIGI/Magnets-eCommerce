import envConstants from '../constants/env.constants';
import VerificationCodeType from '../constants/verificationCodeType.constants';
import SessionModel from '../models/Session.model';
import UserModEl from '../models/User.model';
import VerificationCodeModel from '../models/VerificationCode.model';
import { HttpStatusCode } from '../constants/error.constants';
import dateUtils from '../utils/date.utils';
import jwt from 'jsonwebtoken';
import { DB_COLLECTIONS } from '../config/MongoDB.config';
import appAssert from '../utils/appErrorAssert.utils';
import UserModel from '../models/User.model';

const SERVICE_NAME = DB_COLLECTIONS.Users;

export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

const createAccount = async (data: CreateAccountParams) => {
  const existingUser = await UserModel.exists({ email: data.email });

  //Verfiy if user already exists
  appAssert(
    !existingUser,
    HttpStatusCode.Conflict,
    'Email already in use',
    SERVICE_NAME
  );

  //create User
  const user = await UserModEl.create({
    email: data.email,
    password: data.password,
  });

  //create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: dateUtils.oneYearFromNowInMs(),
  });

  //send verification email

  //create session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  //sign access token & refresh token
  const refreshToken = jwt.sign(
    { sessionId: session._id },
    envConstants.JWT_REFRESH_SECRET,
    {
      audience: ['user'],
      expiresIn: '30d',
    }
  );

  const accessToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    envConstants.JWT_SECRET,
    {
      audience: ['user'],
      expiresIn: '30M',
    }
  );

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};

const login = async ({ email, password, userAgent }: LoginParams) => {
  //get the user by email
  const user = await UserModel.findOne({ email });

  appAssert(
    user,
    HttpStatusCode.Unauthorized,
    'Invalid email or password',
    SERVICE_NAME
  );

  const isValid = await user.comparePassword(password);

  // validate the password from the request
  // create a session
  //sign access and refresh tokens
  // return user & tokens
};

export default {
  createAccount,
  login,
};
