import { NextFunction, Request, Response } from 'express';
import { APP_ERROR_MESSAGE } from 'src/constants';
import { HttpException } from 'src/exceptions/exception';

export function errorMiddleware(
  error: HttpException | Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof HttpException) {
    console.log(`ImmuDB API error: Code ${error.status}, ${error.message}`);
  }

  return response
    .status(500)
    .send({ status: 500, message: APP_ERROR_MESSAGE.serverError, error: error.message });
}
