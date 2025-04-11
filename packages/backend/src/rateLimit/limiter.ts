import rateLimit from 'express-rate-limit';
import type { RequestHandler } from 'express';

const limiter: RequestHandler = rateLimit({
  windowMs: 10 * 1000,
  max: 1,
  message: { error: 'Too many requests, please try again after 10 seconds.' },
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
