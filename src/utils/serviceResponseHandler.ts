import { Response } from 'express';
import { ServiceResponse } from '../api/models';

export const serviceResponseHandler = (
  serviceResponse: ServiceResponse<unknown>,
  response: Response,
) => {
  response.status(serviceResponse.statusCode).send(serviceResponse);
};
