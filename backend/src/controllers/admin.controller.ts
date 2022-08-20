import { Role, CrewMember } from '@prisma/client';
import { NextFunction, Request, Response, Router } from 'express';
import { createDepartmentUser } from '../services/auth.service';
import {
  getUserDetails,
  AddCrewMembers,
  searchUsers,
  getCrewMemberDetails,
  searchCrewMembers,
} from '../services/admin.service';

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

// Add crew members
router.post(
  '/crewMember',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const crewMember = await AddCrewMembers(req.body as CrewMember);
      res.json(crewMember);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Get user details
 */
router.get('/user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUserDetails();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/**
 * Search for users
 */
router.get(
  '/user/search/:searchTerm',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await searchUsers(req.params.searchTerm);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Get crew member details
 */
router.get(
  '/crew-member',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getCrewMemberDetails();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Search for crew members
 */
router.get(
  '/crew-member/search/:searchTerm',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await searchCrewMembers(req.params.searchTerm);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
