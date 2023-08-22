import { NextFunction, Request, Response } from 'express';
import { ExpressMiddleware, RequestMixin } from '../types';

export default function requestedAtMiddleware(): ExpressMiddleware {
  return (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    (request as RequestMixin).requestedAt = new Date();
    next();
  };
}
