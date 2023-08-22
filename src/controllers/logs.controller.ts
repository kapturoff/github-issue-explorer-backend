import { Request, Response } from 'express';
import { RequestLog } from '../models/requestLog.schema';

type TLogsQueries = { page: number; per_page: number };

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 30;

async function listLogs(
  request: Request<null, null, null, Partial<TLogsQueries>>,
  response: Response,
) {
  const options: TLogsQueries = {
    per_page: request.query.per_page || DEFAULT_PER_PAGE,
    page: request.query.page || DEFAULT_PAGE,
  };

  const logs = await RequestLog.find()
    .limit(options.per_page)
    .skip((options.page - 1) * options.per_page)
    .lean();

  // Getting the numbers of logs stored in database
  const count = await RequestLog.countDocuments();

  response.json({
    logs,
    totalPages: Math.ceil(count / options.per_page),
    currentPage: options.page,
  });
}

/* eslint-disable-next-line import/prefer-default-export */
export { listLogs };
