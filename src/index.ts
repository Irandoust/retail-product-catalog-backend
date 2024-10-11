import express from 'express';
import { env } from './config';

const app = express();

app.use(express.json());

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
