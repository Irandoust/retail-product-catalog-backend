import { Response } from 'express';
import { ServiceResponse } from '../api/models';

/**
 * Sends a structured service response to the client.
 *
 * @param {ServiceResponse<unknown>} serviceResponse - The structured response containing success, message, data, and statusCode.
 * @param {Response} response - The Express response object used to send the response.
 */
export const serviceResponseHandler = (
  serviceResponse: ServiceResponse<unknown>,
  response: Response,
) => {
  response.status(serviceResponse.statusCode).send(serviceResponse);
};
