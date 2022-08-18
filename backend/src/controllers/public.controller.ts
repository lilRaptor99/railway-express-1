import { NextFunction, Request, Response, Router } from 'express';
import { getStations } from '../services/public.service';

const router = Router();

/**
 * Add Stations
 */
router.get(
  '/stations',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stations = await getStations();
      res.json(stations);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
