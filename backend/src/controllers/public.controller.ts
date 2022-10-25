import { NextFunction, Request, Response, Router } from 'express';
import {
  forgotPassword,
  getStations,
  getTicketPrice,
  getTrainSchedule,
  issueNormalTicket,
  reserveSeats,
  resetPasswordUsingKey,
  searchTrainSchedule,
  verifyEmail,
  getAvailableSeatCount,
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

// Forgot password
router.post(
  '/forgot-password',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const verifyKey = await forgotPassword(req.body.email);
      res.json({ status: 'success', verifyKey });
    } catch (error) {
      next(error);
    }
  }
);

// Forgot password
router.post(
  '/reset-password-using-key',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await resetPasswordUsingKey(
        req.body.verifyKey,
        req.body.email,
        req.body.newPassword
      );
      res.json({ status: 'success' });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Get ticket prices
 */
router.post(
  '/ticket-prices/:ticketType/:ticketClass',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const price = await getTicketPrice(
        req.params.ticketType,
        req.params.ticketClass,
        req.body.from,
        req.body.to
      );
      res.json({ price });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Create normal ticket
 */
router.post(
  '/normal-ticket',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const userId = req?.auth?.userId;
      const ticketData = { ...req.body };
      delete ticketData.quantity;
      const tickets = await issueNormalTicket(
        userId,
        ticketData,
        req.body.quantity
      );
      res.json({ tickets });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Get train schedule
 */
router.get(
  '/train-schedule',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainSchedule = await getTrainSchedule();
      res.json({ trainSchedule });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Search trains
 */
router.post(
  '/search-schedule',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const date = new Date(req.body.date);
      const results = await searchTrainSchedule(
        req.body.from,
        req.body.to,
        date
      );
      res.json({ results });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Get available seat count
 */
router.post(
  '/available-seats',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const totalSeats = await getAvailableSeatCount(
        req.body.turnNumber,
        req.body.scheduleId
      );
      res.json(totalSeats);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Create reservation ticket
 */
router.post(
  '/reservation-ticket',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reservationTicket = await reserveSeats(req.body);
      res.json(reservationTicket);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
