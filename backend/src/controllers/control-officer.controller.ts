import { NextFunction, Request, Response, Router } from 'express';
import { addTrainTurn } from '../services/control-officer.service';

const router = Router();

/**
 * Add train turns
 */
router.post(
  '/train-turn/add',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainTurn = await addTrainTurn(req.body);
      res.json(trainTurn);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
