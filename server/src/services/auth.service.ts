import envConstants from '../constants/env.constants';
import VerificationCodeType from '../constants/verificationCodeType.constants';
import { createCustomError } from '../middelware/error.handler';
import SessionModel from '../models/Session.model';
import UserModal from '../models/User.model';
import VerificationCodeModel from '../models/VerificationCode.model';
import { HttpStatusCode } from '../types/error.type';
import dateUtils from '../utils/date.utils';
import jwt from 'jsonwebtoken';

const SERVICE_NAME = 'Auth';

export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

const createAccount = async (data: CreateAccountParams) => {
  const existingUser = await UserModal.exists({ email: data.email });

  //Verfiy if user already exists
  if (existingUser) {
    throw createCustomError(
      HttpStatusCode.Forbidden,
      SERVICE_NAME,
      `'User already exists`
    );
  }

  //create User
  const user = await UserModal.create({
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
    user,
    accessToken,
    refreshToken,
  };
};

export default {
  createAccount,
};
