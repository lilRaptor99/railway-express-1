import { Router } from 'express';
import adminController from '../controllers/admin.controller';
import authController from '../controllers/auth.controller';
import controlOfficerController from '../controllers/control-officer.controller';
import passengerController from '../controllers/passenger.controller';
import publicController from '../controllers/public.controller';
import userController from '../controllers/user.controller';
import auth, { isAuthorized } from '../utils/auth';

const adminApi = Router()
  .use(auth.required, (req, res, next) => isAuthorized('ADMIN', req, next))
  .use(adminController);

const controlOfficerApi = Router()
  .use(auth.required, (req, res, next) =>
    isAuthorized('CONTROL_OFFICER', req, next)
  )
  .use(controlOfficerController);

const passengerApi = Router()
  .use(auth.required, (req, res, next) => isAuthorized('PASSENGER', req, next))
  .use(passengerController);

const userApi = Router().use(auth.required).use(userController);

const api = Router()
  .use(authController)
  .use('/admin', adminApi)
  .use('/passenger', passengerApi)
  .use('/public', publicController)
  .use('/user', userApi)
  .use('/control-officer', controlOfficerApi);

export default Router().use('/api', api);
