import express, { Request, Response, NextFunction } from 'express';
import Logger from './core/Logger';
import helmet from "helmet";
import bodyParser from 'body-parser';
import cors from 'cors';
import { corsUrl, environment } from './config';
import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import routesV1 from './routes/v1';

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use(helmet());

// Routes
app.use('/api/v1', routesV1);

// 404
app.use((_req, _res, next) => next(new NotFoundError()));

// Errors
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): any => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {

    if (environment === 'development') {
      Logger.error(err);
      return res.status(500).send(err.message);
    }

    ApiError.handle(new InternalError(), res);
  }
});

export default app;