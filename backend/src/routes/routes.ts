import { Router } from 'express';
import authController from '../controllers/auth.controller';
import adminController from '../controllers/admin.controller';
import publicController from '../controllers/public.controller';
import auth, { isAuthorized } from '../utils/auth';

const adminApi = Router()
  .use(auth.required, (req, res, next) => isAuthorized('ADMIN', req, next))
  .use(adminController);

const api = Router()
  .use(authController)
  .use('/admin', adminApi)
  .use('/public', publicController);

export default Router().use('/api', api);
