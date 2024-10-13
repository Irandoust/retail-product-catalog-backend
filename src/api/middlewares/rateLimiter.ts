import { rateLimit } from 'express-rate-limit';
import { env } from '../../config';

/**
 * Middleware for rate limiting incoming requests.
 *
 * - Limits the number of requests from a single IP within a specified time window.
 * - Helps protect the application from potential abuse or denial-of-service attacks by limiting excessive requests.
 *
 * Configuration:
 * - `limit`: The maximum number of requests allowed within the time window.
 * - `windowMs`: The duration of the time window in milliseconds (default is 15 minutes).
 * - `message`: The message to send when the rate limit is exceeded.
 * - `standardHeaders`: Enables the inclusion of standard rate limit headers (`RateLimit-*`).
 */
export const rateLimiter = rateLimit({
  limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  windowMs: 15 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS,
});
