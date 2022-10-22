import { NextFunction, Request, Response, Router } from 'express';
import {
  createNormalTicket,
  getStations,
  getTicketPrice,
  forgotPassword,
  resetPasswordUsingKey,
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

export default router;

/**
 * Get ticket prices
 */
router.post(
  '/ticket-prices/:ticketType/:ticketClass/',
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
 * Issue a normal ticket
 */
router.post(
  '/issue-normal-ticket',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ticket = await createNormalTicket(
        req.body,
        // @ts-ignore
        req.auth.userId
      );
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  }
);
