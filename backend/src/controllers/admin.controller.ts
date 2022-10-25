import { Role, CrewMember, ReasonToBlock } from '@prisma/client';
import { NextFunction, Request, Response, Router } from 'express';
import { createDepartmentUser } from '../services/auth.service';
import {
  getUserDetails,
  AddCrewMembers,
  searchUsers,
  getCrewMemberDetails,
  searchCrewMembers,
  getPassengerDetails,
  searchPassengers,
  getCrewMemberProfileById,
  getUserProfileById,
  blockUser,
  unblockUser,
  deleteReasonToBlockUser,
  getreasonToBlockUser,
  deleteCrewMember,
  setReasonToBlockUser,
  AddPriceList,
  getTicketStats,
  getUserStats,
  getIncomeStats,
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

// Add ticket price list

router.post(
  '/addPriceList',
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }

    try {
      // @ts-ignore
      const priceList = await AddPriceList(req.files.file);
      res.json(priceList);
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

/**
 * Get passenger details
 */
router.get(
  '/passenger',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getPassengerDetails();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Search for passengers
 */
router.get(
  '/passenger/search/:searchTerm',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await searchPassengers(req.params.searchTerm);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Get crew member profile by id
 */
router.get(
  '/crew-member/profile/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getCrewMemberProfileById(req.params.id);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Get user profile by id
 */
router.get(
  '/user/profile/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getUserProfileById(req.params.id);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

// Block user
router.put(
  '/user/block/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await blockUser(req.params.id);
      res.json({ status: 'success' });
    } catch (error) {
      next(error);
    }
  }
);

// Add reason to block user
router.post(
  '/user/block/reason/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await setReasonToBlockUser(req.body as ReasonToBlock);
      res.json({ status: 'success' });
    } catch (error) {
      next(error);
    }
  }
);

// Get reason to block user
router.get(
  '/user/block/reason/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reason = await getreasonToBlockUser(req.params.id);
      res.json(reason);
    } catch (error) {
      next(error);
    }
  }
);

// Unblock user
router.put(
  '/user/unblock/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await unblockUser(req.params.id);
      res.json({ status: 'success' });
    } catch (error) {
      next(error);
    }
  }
);

// Delete reason to block user
router.delete(
  '/user/block/reason/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteReasonToBlockUser(req.params.id);
      res.json({ status: 'success' });
    } catch (error) {
      next(error);
    }
  }
);

// Delete Crew Member
router.put(
  '/crew-member/delete/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteCrewMember(req.params.id);
      res.json({ status: 'success' });
    } catch (error) {
      next(error);
    }
  }
);

/*
 Statistics
*/
router.get(
  '/stats/ticket',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getTicketStats();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/stats/user',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getUserStats();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/stats/income',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getIncomeStats();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
