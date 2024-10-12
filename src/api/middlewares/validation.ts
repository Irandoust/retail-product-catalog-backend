import type { NextFunction, Request, Response } from 'express';
import type { ZodError, ZodSchema } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ServiceResponse } from '../models/serviceResponse';

export const validateRequest =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({ body: req.body, query: req.query, params: req.params });
      next();
    } catch (err) {
      const errorMessage = `Invalid input: ${(err as ZodError).errors
        .map((e) => e.message)
        .join(', ')}`;

      const serviceResponse = ServiceResponse.failure(
        errorMessage,
        null,
        StatusCodes.BAD_REQUEST,
      );

      res.status(serviceResponse.statusCode).send(serviceResponse);
    }
  };
