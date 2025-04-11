import { Router, Request, Response } from 'express';
import limiter from '../rateLimit/limiter';
import { runAnalysis } from '../analysis/initial_analysis';
import { resourceAnalysis } from '../analysis/resource_analysis';
import { decisionAnalysis } from '../analysis/decision_analysis';

const router = Router();

router.post('/initial-analysis', limiter, async (req: Request, res: Response): Promise<void> => {
  const { agenda } = req.body;

  if (!agenda || typeof agenda !== 'string') {
    res.status(400).json({ error: 'Missing or invalid "agenda" in body' });
    return;
  }

  try {
    const result = await runAnalysis(agenda);
    res.json({ result });
  } catch (err) {
    console.error('Error during initial analysis:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/resource-analysis', limiter, async (req: Request, res: Response): Promise<void> => {
  const { initial_analysis } = req.body;

  if (!initial_analysis || typeof initial_analysis !== 'string') {
    res.status(400).json({ error: 'Missing or invalid "initial_analysis" in body' });
    return;
  }

  try {
    const result = await resourceAnalysis(initial_analysis);
    res.json({ result });
  } catch (err) {
    console.error('Error during resource analysis:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/decision-analysis', limiter, async (req: Request, res: Response): Promise<void> => {
  const { agenda, initial_analysis, resource_analysis, agent_personality = '' } = req.body;

  if (
    !agenda || typeof agenda !== 'string' ||
    !initial_analysis || typeof initial_analysis !== 'string' ||
    !resource_analysis || typeof resource_analysis !== 'string'
  ) {
    res.status(400).json({ error: 'Missing or invalid input fields (agenda, initial_analysis, resource_analysis)' });
    return;
  }

  try {
    const result = await decisionAnalysis(agenda, initial_analysis, resource_analysis, agent_personality);
    res.json({ result });
  } catch (err) {
    console.error('Error during decision analysis:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;

