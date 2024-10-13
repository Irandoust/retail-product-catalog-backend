import dotenv from 'dotenv';
import { cleanEnv, str, host, port, num } from 'envalid';

dotenv.config();

/**
 * Validates and cleans environment variables using envalid.
 * Ensures that required environment variables are present, with sensible defaults if not explicitly set.
 *
 * - NODE_ENV: Specifies the environment ('development', 'production', or 'test').
 * - HOST: The hostname where the server is hosted.
 * - PORT: The port the application will listen on.
 * - FUZZY_SEARCH_MAX_ALLOWED_DISTANCE: The maximum edit distance allowed for fuzzy searches.
 * - COMMON_RATE_LIMIT_MAX_REQUESTS: The maximum number of requests allowed within a time window (for rate limiting).
 * - COMMON_RATE_LIMIT_WINDOW_MS: The time window in milliseconds for rate limiting requests.
 * - CORS_ORIGIN: The allowed origin for Cross-Origin Resource Sharing (CORS).
 */
export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: 'development',
    choices: ['development', 'production', 'test'],
  }),
  HOST: host({ default: 'localhost' }),
  PORT: port({ default: 3000 }),
  FUZZY_SEARCH_MAX_ALLOWED_DISTANCE: num({
    default: 3,
    desc: 'Max allowed distance for fuzzy search.',
  }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ default: 100 }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ default: 100 }),
  CORS_ORIGIN: str({ default: 'http://localhost:3001' }),
});
