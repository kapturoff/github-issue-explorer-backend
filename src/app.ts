import axios from 'axios';
import { config } from 'dotenv';
import express from 'express';
import 'express-async-errors';
import { connect } from 'mongoose';

import { errorLoggerMiddleware, loggerMiddleware } from './middlewares/logger.middleware';
import requestedAtMiddleware from './middlewares/requestedAt.middleware';

import IssuesRouter from './routes/issues.routes';
import RepositoriesRouter from './routes/repositories.routes';
import LogsRouter from './routes/logs.routes';

// Loads .env file into process.env
config({ path: '.env' });

// Configures axios to use this as a base url (allows to use relatives paths)
axios.defaults.baseURL = 'https://api.github.com';

const app = express();
const PORT = process.env.PORT || 8080;

app.enable('trust proxy');

// Attaching middlewares
app.use(express.json());
app.use(requestedAtMiddleware());
app.use(loggerMiddleware());

// Attaching routes
app.use('/issues', IssuesRouter);
app.use('/repositories', RepositoriesRouter);
app.use('/logs', LogsRouter);

app.use(errorLoggerMiddleware());

// Running server
async function main() {
  // Connects to Mongo
  if (!process.env.MONGO_URL) throw new Error('MONGO_URL was not provided');
  await connect(process.env.MONGO_URL);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

main();
