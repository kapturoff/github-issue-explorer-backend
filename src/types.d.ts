import { Request, Response, NextFunction } from 'express';

export type RequestTimeMiddlewareMixin = { requestedAt: Date };
export type RequestMixin = Request & RequestTimeMiddlewareMixin;

export type ExpressSimpleMiddleware = (
  request: Request | RequestMixin,
  response: Response,
  next: NextFunction,
) => void;

export type ExpressErrorMiddleware = (
  error: unknown,
  request: Request | RequestMixin,
  response: Response,
  next: NextFunction,
) => void;

export type ExpressMiddleware = ExpressSimpleMiddleware | ExpressErrorMiddleware;
