import { HttpStatusCode } from 'axios';
import { model, Schema } from 'mongoose';

export interface IRequestLog {
  requestedAt: Date;
  ip: string;
  status: typeof HttpStatusCode;
  method: string;
  path: string;
}

const requestLogSchema = new Schema<IRequestLog>(
  {
    requestedAt: { type: Date, required: true },
    ip: { type: String, required: true },
    status: { type: Number, required: true },
    method: { type: String, required: true },
    path: { type: String, required: true },
  },
  { collection: 'logs' },
);

const RequestLog = model<IRequestLog>('LogSchema', requestLogSchema);

export { requestLogSchema, RequestLog };
