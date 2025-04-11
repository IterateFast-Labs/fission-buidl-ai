import { Router, Request, Response } from 'express';

const router = Router();

router.post('/validate-password', (req: Request, res: Response) => {
  const apiPassword = req.headers['x-api-password'] as string | undefined;
  const expectedPassword = process.env.API_PASSWORD;

  const pass = !!apiPassword && apiPassword === expectedPassword;
  res.json({ pass });
});

export default router;
