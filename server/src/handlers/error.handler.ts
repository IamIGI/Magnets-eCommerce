import { NextFunction, Response, Request } from 'express';
import { HttpStatusCode } from '../types/error.type';

export interface CustomError extends Error {
  code: HttpStatusCode;
  service: string;
}

export function createCustomError(
  code: HttpStatusCode,
  serviceName: string,
  message: string
) {
  //   const error = JSON.stringify({
  //     code,
  //     service: serviceName,
  //     message,
  //   } as CustomError);

  const error = new Error(message) as CustomError;
  error.name = 'CustomError';
  error.code = code;
  error.service = serviceName;

  return error;
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  const statusCode = err.code || HttpStatusCode.InternalServerError;

  res.status(statusCode).json({
    service: err.service || 'Unknown Service',
    message: err.message,
  });
};
