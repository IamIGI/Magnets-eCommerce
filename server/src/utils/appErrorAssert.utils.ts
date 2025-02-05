import { AppErrorCode, HttpStatusCode } from '../constants/error.constants';
import assert from 'node:assert';
import AppError from './appError.utils';
import { DB_COLLECTIONS } from '../config/MongoDB.config';

export type Services = DB_COLLECTIONS | 'Validation' | 'Authentication';

type appAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  service?: Services,
  appErrorCode?: AppErrorCode
) => asserts condition;

/**
 * Asserts a condition and throws an AppError if the condition is false
 */
const appAssert: appAssert = (
  condition,
  httpStatusCode,
  message,
  service,
  appErrorCode
) =>
  assert(
    condition, // if false then throw an error
    new AppError(httpStatusCode, message, service, appErrorCode)
  );

// const appAssert: appAssert = (
//   condition,
//   httpStatusCode,
//   message,
//   service,
//   appErrorCode
// ) => condition && new AppError(httpStatusCode, message, service, appErrorCode);

export default appAssert;
