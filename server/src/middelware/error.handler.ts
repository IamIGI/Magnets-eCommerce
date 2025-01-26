import { NextFunction, Response, Request, ErrorRequestHandler } from 'express';
import { HttpStatusCode } from '../types/error.type';
import path from 'path';

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

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`PATH: "${req.path}"\n`, err);

  const statusCode = err.code || HttpStatusCode.InternalServerError;

  res.status(statusCode).json({
    service: err.service || 'Unknown Service',
    message: err.message,
  });
};

export const unknownURLHandler = (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ error: '404: URL not found' });
  } else if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else {
    res.type('txt').send('404: Text file not found');
  }
};
