import express, { Request, Response } from 'express';
import { env } from './config';
import { StatusCodes } from 'http-status-codes';
import { productRouter } from './api/routes/productRouter';
import { rateLimiter } from './api/middlewares/rateLimiter';
import cors from 'cors';

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS with specified origin
app.use(cors({ origin: env.CORS_ORIGIN }));

// Apply rate limiting to all routes
app.use(rateLimiter);

// Route handler for product API
app.use('/products', productRouter);

// Fallback route for undefined paths (404 handler)
app.use('*', (_req: Request, res: Response): void => {
  res.status(StatusCodes.NOT_FOUND).send({ error: 'Not Found' });
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
