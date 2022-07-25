import { Role } from '@prisma/client';
import { NextFunction, Request, Response, Router } from 'express';
import { createDepartmentUser } from '../services/auth.service';

const router = Router();

/**
 * Add department users
 */
router.post(
  '/user/:userType',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await createDepartmentUser(
        req.body,
        req.params.userType as Role
      );
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
