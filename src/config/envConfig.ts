import dotenv from 'dotenv';
import { cleanEnv, str, host, port, num } from 'envalid';

dotenv.config();

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
});
