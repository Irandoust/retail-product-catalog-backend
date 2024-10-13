import express, { Request, Response } from 'express';
import { env } from './config';
import { StatusCodes } from 'http-status-codes';
import { productRouter } from './api/routes/productRouter';
import { rateLimiter } from './api/middlewares/rateLimiter';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

app.use(rateLimiter);

app.use('/products', productRouter);

app.use('*', (_req: Request, res: Response): void => {
  res.status(StatusCodes.NOT_FOUND).send({ error: 'Not Found' });
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
