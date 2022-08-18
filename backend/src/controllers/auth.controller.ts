import { NextFunction, Request, Response, Router } from 'express';
import { Station } from '@prisma/client';
import { addStation } from '../services/public.service';
import { createPassenger, login } from '../services/auth.service';

const router = Router();

/**
 * Login
 */
router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await login(req.body.email, req.body.password);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Create an user
 */
router.post(
  '/user',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await createPassenger(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Add Stations
 */
router.post(
  '/stations',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await addStation(req.body as Station);
      res.json({ status: 'Success' });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
