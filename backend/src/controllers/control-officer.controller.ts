import { NextFunction, Request, Response, Router } from 'express';
import {
  addTrainTurn,
  getTrainTurns,
  getTrainTurnByTurnNumber,
  deleteTrainTurn,
  getFeedbackById,
  getComplaintsAndSuggestions,
  getLocationByTurnNumber,
  getCrewMemberDetails,
  getScheduleDetails,
  allocateCrewMembers,
} from '../services/control-officer.service';

const router = Router();

/** p
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

// Get complaints and suggestions
router.get(
  '/complaints-suggestions',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const feedbackList = await getComplaintsAndSuggestions();
      res.json(feedbackList);
    } catch (error) {
      next(error);
    }
  }
);

// Get compalaints or suggestions by id
router.get(
  '/complaints-suggestions/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const feedback = await getFeedbackById(req.params.id);
      res.json(feedback);
    } catch (error) {
      next(error);
    }
  }
);

// Get locations by turn number
router.get(
  '/location/:turnNumber',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainTurnNumber = parseInt(req.params.turnNumber, 10);
      const station = await getLocationByTurnNumber(trainTurnNumber);
      res.json(station);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/crew-member',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getCrewMemberDetails();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

// Get train schedule details
router.get(
  '/train-schedule-details',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainScheduleDetails = await getScheduleDetails();
      res.json(trainScheduleDetails);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/allocate-crew-members/:scheduleId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const crewMemberInput = await allocateCrewMembers(
        req.params.scheduleId,
        req.body
      );
      res.json(crewMemberInput);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
