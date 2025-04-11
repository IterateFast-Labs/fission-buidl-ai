import express from 'express';
import { Router, Request, Response } from 'express';
import corsMiddleware from './middleware/cors';
import apiKeyMiddleware from './middleware/apiKey';
import analysisRouter from './routes/analysis.route';
import validateRouter from './routes/validate.route';
import 'dotenv/config';
import limiter from "./rateLimit/limiter";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(corsMiddleware);

app.get('/ping', limiter, async (req: Request, res: Response): Promise<void> => {

  res.send("pong");
  return;
});

app.get('/version', limiter, async (req: Request, res: Response): Promise<void> => {

  const version = process.env.VERSION || "unknown";
  res.send(version);
  return;
});

app.use(apiKeyMiddleware);


app.use('/api', analysisRouter);
app.use('/api', validateRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
