import dotenv from 'dotenv';
import { cleanEnv, str, host, port } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: 'development',
    choices: ['development', 'production', 'test'],
  }),
  HOST: host({ default: 'localhost' }),
  PORT: port({ default: 3000 }),
});
