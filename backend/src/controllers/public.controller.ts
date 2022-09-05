import { NextFunction, Request, Response, Router } from 'express';
import {
  getStations,
  getTicketPrice,
  verifyEmail,
} from '../services/public.service';

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

/**
 * Add Stations
 */
router.post(
  '/verify-email',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const verifyKey = await verifyEmail(
        req.body.email,
        req.body.firstName,
        req.body.lastName
      );
      res.json({ verifyKey });
    } catch (error) {
      next(error);
    }
  }
);
export default router;

/**
 * Get ticket prices
 */
router.get(
  '/ticket-prices/:ticketType/:ticketClass/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const price = await getTicketPrice(
        req.params.ticketType,
        req.params.ticketClass,
        req.body.from,
        req.body.to
      );
      res.json(price);
    } catch (error) {
      next(error);
    }
  }
);
