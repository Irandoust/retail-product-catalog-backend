import { StatusCodes } from 'http-status-codes';
import { ServiceResponse } from '../api/models';

export const exceptionHandler = (
  ex: unknown,
  context: string,
): ServiceResponse => {
  const errorMessage = `${context}: ${(ex as Error).message}`;

  return ServiceResponse.failure(
    errorMessage ?? 'An error occurred while processing the request.',
    null,
    StatusCodes.INTERNAL_SERVER_ERROR,
  );
};
