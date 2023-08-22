import { HttpStatusCode } from 'axios';
import { config } from 'dotenv';
import { Response } from 'express';
import {
  transport as Transport,
  createLogger,
  format,
  transports,
} from 'winston';
import { IRequestLog, RequestLog } from '../models/requestLog.schema';
import { RequestMixin } from '../types';
import MongooseTransport from './mongooseTransport';

// Loads .env file into process.env
config({ path: '.env' });

const connectedTransports: Transport[] = [
  new transports.Console(),
];

// Transports all logs to mongodb if URL's provided
if (process.env.MONGO_URL) {
  const mongooseTransport = new MongooseTransport({
    model: RequestLog,
  });

  connectedTransports.push(mongooseTransport);
}

export default createLogger({
  transports: connectedTransports,
  level: 'debug',
  format: format.json(),
});

/**
 * Prepares request to be logged
 *
 * @param request Express request
 * @param response Express response
 */
export function prepareRequest(
  request: RequestMixin,
  response: Response,
): IRequestLog {
  return {
    ip: request.headers['x-forwarded-for'] as string
      || request.socket.remoteAddress
      || 'unknown',
    requestedAt: request.requestedAt,
    status: response.statusCode as unknown as typeof HttpStatusCode,
    method: request.method,
    path: request.originalUrl,
  };
}
