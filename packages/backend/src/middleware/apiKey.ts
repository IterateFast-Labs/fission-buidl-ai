import { RequestHandler } from 'express';

const apiKeyMiddleware: RequestHandler = (req, res, next) => {
  const apiPassword = req.headers['x-api-password'] as string | undefined;
  const expectedPassword = process.env.API_PASSWORD;

  if (!apiPassword || apiPassword !== expectedPassword) {
    res.status(403).json({ error: 'Forbidden: Invalid or missing x-api-password' });
    return;
  }

  next();
};

export default apiKeyMiddleware;
