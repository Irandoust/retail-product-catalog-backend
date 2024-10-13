import type { NextFunction, Request, Response } from 'express';
import type { ZodError, ZodSchema } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ServiceResponse } from '../models';

/**
 * Middleware to validate incoming requests against a Zod schema.
 * Ensures that the body, query, and parameters of the request meet the expected schema.
 * If validation fails, it returns a structured error response with the validation messages.
 *
 * @param {ZodSchema} schema - The Zod schema used to validate the request.
 * @returns {Function} A middleware function that validates the request and calls the next middleware if valid, or sends an error response if invalid.
 */
export const validateRequest =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate the request's body, query parameters, and route parameters against the schema
      schema.parse({ body: req.body, query: req.query, params: req.params });

      next();
    } catch (err) {
      // If validation fails, construct a detailed error message from Zod's validation errors
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
