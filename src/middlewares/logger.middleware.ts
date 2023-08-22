import { AxiosError, HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { ExpressMiddleware, RequestMixin } from '../types';
import logger, { prepareRequest } from '../utils/logger';

export function loggerMiddleware(): ExpressMiddleware {
  return (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    response.on('finish', () => {
      if (response.statusCode >= HttpStatusCode.BadRequest) return;

      const requestLog = prepareRequest(request as RequestMixin, response);

      logger.info(requestLog);
    });

    next();
  };
}

const DEFAULT_ERROR_FALLBACK = 'Server-side problem';

export function errorLoggerMiddleware(): ExpressMiddleware {
  return (
    error: unknown,
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const errorDetails = (error as Error)?.message
      || (error as AxiosError)?.message
      || DEFAULT_ERROR_FALLBACK;

    const requestLog = {
      error: errorDetails,
      ...prepareRequest(request as RequestMixin, response),
    };

    logger.error(requestLog);

    next(error);
  };
}
