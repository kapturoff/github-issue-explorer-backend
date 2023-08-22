import { Request, Response } from 'express';
import { RequestLog } from '../models/requestLog.schema';

type TLogsQueries = { page: number; per_page: number };

const DEFAULT_PAGE = 0;
const DEFAULT_PER_PAGE = 30;

async function listLogs(
  request: Request<null, null, null, Partial<TLogsQueries>>,
  response: Response,
) {
  const options: TLogsQueries = {
    per_page: request.query.per_page || DEFAULT_PER_PAGE,
    page: request.query.per_page || DEFAULT_PAGE,
  };

  const logs = await RequestLog.find()
    .limit(options.per_page)
    .skip(options.page * options.per_page)
    .lean();

  response.json(logs);
}

/* eslint-disable-next-line import/prefer-default-export */
export { listLogs };
