import { NextFunction, Request, Response, Router } from 'express';
import {
  addTrainTurn,
  getTrainTurns,
  getTrainTurnByTurnNumber,
  deleteTrainTurn,
} from '../services/control-officer.service';

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

// Get train turns
router.get(
  '/train-turn',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainTurn = await getTrainTurns();
      res.json(trainTurn);
    } catch (error) {
      next(error);
    }
  }
);

// Search train turns
router.get(
  '/train-turn/search/:searchTerm',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainTurnNumber = parseInt(req.params.searchTerm, 10);
      const trainTurn = await getTrainTurnByTurnNumber(trainTurnNumber);
      res.json(trainTurn);
    } catch (error) {
      next(error);
    }
  }
);

// Delete train turn
router.delete(
  '/train-turn/:turnNumber',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainTurnNumber = parseInt(req.params.turnNumber, 10);
      await deleteTrainTurn(trainTurnNumber);
      res.json({ status: 'success' });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
