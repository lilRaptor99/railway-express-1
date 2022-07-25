import { NextFunction, Request, Response, Router } from 'express';
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

export default router;
