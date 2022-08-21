import { Router } from 'express';
import authController from '../controllers/auth.controller';
import adminController from '../controllers/admin.controller';
import publicController from '../controllers/public.controller';
import auth, { isAuthorized } from '../utils/auth';
import userController from '../controllers/user.controller';

const adminApi = Router()
  .use(auth.required, (req, res, next) => isAuthorized('ADMIN', req, next))
  .use(adminController);

const userApi = Router().use(auth.required).use(userController);

const api = Router()
  .use(authController)
  .use('/admin', adminApi)
  .use('/public', publicController)
  .use('/user', userApi);

export default Router().use('/api', api);
