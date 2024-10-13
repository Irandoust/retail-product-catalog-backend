import { StatusCodes } from 'http-status-codes';
import { ServiceResponse } from '../api/models';

/**
 * Handles exceptions and returns a standardized failure response.
 * This function is used to catch errors in the application and convert them into a
 * structured error response that includes the error message and a failure status code.
 *
 * @param {unknown} err - The exception object (can be of any type).
 * @param {string} context - A string providing context or additional information about where the error occurred.
 * @returns {ServiceResponse} A failure response object containing the error message and a 500 Internal Server Error status code.
 */
export const exceptionHandler = (
  err: unknown,
  context: string,
): ServiceResponse => {
  // Extract the error message and prepend it with the provided context
  const errorMessage = `${context}: ${(err as Error).message}`;

  // Return a standardized failure response with a 500 Internal Server Error status code
  return ServiceResponse.failure(
    errorMessage ?? 'An error occurred while processing the request.',
    null,
    StatusCodes.INTERNAL_SERVER_ERROR,
  );
};
