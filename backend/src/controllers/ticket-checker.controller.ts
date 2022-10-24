import { NextFunction, Request, Response, Router } from 'express';
import {
  discreditTicket,
  validateTicket,
} from '../services/ticket-checker.service';

const router = Router();

router.post(
  '/discredit',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const { userId } = req.auth;
      const status = await discreditTicket(req.body.ticketId, userId);
      res.json({ status });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/validate',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const { userId } = req.auth;
      const status = await validateTicket(req.body.ticketId, userId);
      res.json({ status });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
