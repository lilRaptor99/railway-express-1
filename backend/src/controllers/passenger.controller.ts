import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../models/user.model';
import { updateProfile } from '../services/passenger.service';

const router = Router();

/**
 * Update passenger profile
 */
router.post(
  '/update-profile',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: User = req.body;
      // @ts-ignore
      user.userId = req.auth.userId;

      const status = await updateProfile(user);
      if (status) {
        res.json({ status: 'success' });
      } else {
        res.json({ status: 'unsuccess' });
      }
    } catch (error) {
      next(error);
    }
  }
);

export default router;
