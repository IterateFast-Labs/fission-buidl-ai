import express from 'express';
import corsMiddleware from './middleware/cors';
import apiKeyMiddleware from './middleware/apiKey';
import analysisRouter from './routes/analysis.route';
import validateRouter from './routes/validate.route';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(corsMiddleware);
app.use(apiKeyMiddleware);

app.use('/api', analysisRouter);
app.use('/api', validateRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
