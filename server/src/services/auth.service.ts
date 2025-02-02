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
import jwtUtils, { RefreshTokenPayload } from '../utils/jwt.utils';
import { sendEmail } from '../utils/sendEmail.utils';
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from '../utils/emailTemplates.utils';
import bcryptUtils from '../utils/bcrypt.utils';

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
  const userId = user._id;

  //create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: dateUtils.oneYearFromNowInMs(),
  });

  //send verification email
  const url = `${envConstants.APP_ORIGIN}/email/verify/${verificationCode._id}`;
  const { error } = await sendEmail({
    to: user.email,
    ...getVerifyEmailTemplate(url),
  });
  if (error) {
    //FIXME: ignore for now
    console.log(error);
  }

  //create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  //sign access token & refresh token
  //sign access and refresh tokens
  const refreshToken = jwtUtils.signToken(
    { sessionId: session._id },
    jwtUtils.refreshTokenSignOptions
  );

  const accessToken = jwtUtils.signToken({
    sessionId: session._id,
    userId,
  });

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

  // validate the password from the request
  const isValid = await user.comparePassword(password);
  appAssert(isValid, HttpStatusCode.Unauthorized, 'Invalid email or password');

  // create a session
  const userId = user._id;
  const session = await SessionModel.create({
    userId,
    userAgent,
  });
  const sessionInfo = {
    sessionId: session._id,
  };
  //sign access and refresh tokens
  const refreshToken = jwtUtils.signToken(
    sessionInfo,
    jwtUtils.refreshTokenSignOptions
  );

  const accessToken = jwtUtils.signToken({ ...sessionInfo, userId: user._id });

  // return user & tokens
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = jwtUtils.verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: jwtUtils.refreshTokenSignOptions.secret,
  });
  appAssert(
    payload,
    HttpStatusCode.Unauthorized,
    'Invalid refresh token',
    DB_COLLECTIONS.Sessions
  );

  const session = await SessionModel.findById(payload.sessionId);
  //after 30d request, session was already deleted
  const now = Date.now();
  appAssert(
    session && session.expiresAt.getTime() > now,
    HttpStatusCode.Unauthorized,
    'Session expired',
    DB_COLLECTIONS.Sessions
  );

  //refresh the session if it expires in the next 5*24 hours

  const sessionNeedsRefresh =
    session.expiresAt.getTime() - now <= dateUtils.daysInMS(5);
  if (sessionNeedsRefresh) {
    session.expiresAt = dateUtils.thirtyDaysFromNowInMS();
    await session.save();
  }

  const newRefreshToken = sessionNeedsRefresh
    ? jwtUtils.signToken(
        {
          sessionId: session._id,
        },
        jwtUtils.refreshTokenSignOptions
      )
    : undefined;

  const accessToken = jwtUtils.signToken({
    userId: session.userId,
    sessionId: session._id,
  });

  return {
    accessToken,
    newRefreshToken,
  };
};

const verifyEmail = async (code: string) => {
  //get the verification code
  const validCode = await VerificationCodeModel.findOne({
    _id: code,
    type: VerificationCodeType.EmailVerification,
    expiresAt: { $gt: new Date() },
  });
  appAssert(
    validCode,
    HttpStatusCode.NotFound,
    'Invalid or expired verification code',
    SERVICE_NAME
  );

  //update user the verified true
  const updatedUser = await UserModel.findByIdAndUpdate(
    validCode.userId,
    {
      verified: true,
    },
    {
      new: true,
    }
  );
  appAssert(
    updatedUser,
    HttpStatusCode.InternalServerError,
    'Failed to verify email',
    SERVICE_NAME
  );

  //delete verification code
  await validCode.deleteOne();

  //return user
  return {
    user: updatedUser.omitPassword(),
  };
};

const sendPasswordResetEmail = async (email: string) => {
  //get the user by email
  const user = await UserModel.findOne({ email });
  appAssert(user, HttpStatusCode.NotFound, 'User not found');

  //check email rate limit
  const fiveMinAgo = dateUtils.fiveMinAgoInMs();
  const count = await VerificationCodeModel.countDocuments({
    userId: user._id,
    type: VerificationCodeType.PasswordReset,
    createdAt: { $gt: fiveMinAgo },
  });
  appAssert(
    count <= 1,
    HttpStatusCode.TooManyRequests,
    'Too many requests, please try again later'
  );

  // create verification code
  const expiresAt = dateUtils.oneHourFromNowInMs();
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.PasswordReset,
    expiresAt,
  });

  // send verification email
  const resetURL = `${envConstants.APP_ORIGIN}/password/reset?code=${
    verificationCode._id
  }$exp=${expiresAt.getTime()}`;

  const { data, error } = await sendEmail({
    to: user.email,
    ...getPasswordResetTemplate(resetURL),
  });
  appAssert(
    data?.id,
    HttpStatusCode.InternalServerError,
    `${error?.name} - ${error?.message}`
  );

  // return success
  return {
    url: resetURL,
    emailId: data.id,
  };
};

type ResetPasswordParams = {
  password: string;
  verificationCode: string;
};

const resetPassword = async ({
  password,
  verificationCode,
}: ResetPasswordParams) => {
  //get the verification code
  const validCode = await VerificationCodeModel.findOne({
    _id: verificationCode,
    type: VerificationCodeType.PasswordReset,
    expiresAt: { $gt: new Date() },
  });
  appAssert(
    validCode,
    HttpStatusCode.NotFound,
    'Invalid or expired verification code'
  );

  //update user password
  const updatedUser = await UserModel.findByIdAndUpdate(validCode.userId, {
    password: await bcryptUtils.hashValue(password),
  });
  appAssert(
    updatedUser,
    HttpStatusCode.InternalServerError,
    'Failed to reset password'
  );

  //delete the verification code
  await validCode.deleteOne();

  //delete all sessions
  await SessionModel.deleteMany({
    userId: updatedUser._id,
  });

  return {
    user: updatedUser.omitPassword(),
  };
};

export default {
  createAccount,
  login,
  refreshUserAccessToken,
  verifyEmail,
  sendPasswordResetEmail,
  resetPassword,
};
