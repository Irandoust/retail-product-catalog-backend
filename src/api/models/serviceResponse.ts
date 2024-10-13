import { StatusCodes } from 'http-status-codes';

export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly data: T;
  readonly statusCode: number;

  /**
   * Private constructor to enforce controlled creation of success/failure responses.
   *
   * @param {boolean} success - Indicates whether the operation was successful.
   * @param {string} message - A message providing additional context to the response.
   * @param {T} data - The actual data returned in the response (can be null for failure responses).
   * @param {number} statusCode - The HTTP status code to be returned (e.g., 200 for OK, 400 for Bad Request).
   */
  private constructor(
    success: boolean,
    message: string,
    data: T,
    statusCode: number,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }

  /**
   * Factory method for creating success responses.
   *
   * @param {string} message - Success message.
   * @param {T} data - The data to return in the success response.
   * @param {number} [statusCode=StatusCodes.OK] - The HTTP status code for success (defaults to 200 OK).
   * @returns {ServiceResponse<T>} A success response object.
   */
  static success<T>(
    message: string,
    data: T,
    statusCode: number = StatusCodes.OK,
  ): ServiceResponse<T> {
    return new ServiceResponse(true, message, data, statusCode);
  }

  /**
   * Factory method for creating failure responses.
   *
   * @param {string} message - Failure message.
   * @param {T} data - Any additional data for the failure response (optional).
   * @param {number} [statusCode=StatusCodes.BAD_REQUEST] - The HTTP status code for the failure (defaults to 400 Bad Request).
   * @returns {ServiceResponse<T>} A failure response object.
   */
  static failure<T>(
    message: string,
    data: T,
    statusCode: number = StatusCodes.BAD_REQUEST,
  ): ServiceResponse<T> {
    return new ServiceResponse(false, message, data, statusCode);
  }
}
