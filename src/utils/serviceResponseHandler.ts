import { Response } from 'express';
import { ServiceResponse } from '../api/models/serviceResponse';

export const serviceResponseHandler = (
  serviceResponse: ServiceResponse<unknown>,
  response: Response,
) => {
  response.status(serviceResponse.statusCode).send(serviceResponse);
};
