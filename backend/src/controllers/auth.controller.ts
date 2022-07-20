import { NextFunction, Request, Response, Router } from 'express';
import { createUser } from '../services/auth.service';

const router = Router();

/**
 * Create an user
 */
router.post(
  '/user',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await createUser(req.body.user);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
