import { Model } from 'mongoose';
import { LogCallback, LogEntry } from 'winston';
import Transport, { TransportStreamOptions } from 'winston-transport';

export interface IMongooseTransportOptions<T> {
  model: Model<T>
}

/**
 * Transports all incoming logs to a MongoDB collection binded to the provided model
 */
export default class MongooseTransport<T> extends Transport {
  model: Model<T>;

  constructor(opts: IMongooseTransportOptions<T>) {
    super(opts as TransportStreamOptions);
    this.model = opts.model;
  }

  log(info: LogEntry, callback: LogCallback) {
    /* eslint-disable-next-line new-cap */
    const log = new this.model(info.message);

    log.save();

    callback();
  }
}
