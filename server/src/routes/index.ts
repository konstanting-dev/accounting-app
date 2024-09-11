import { Application } from 'express';
import accountRoutes from './accounts';

const initRoutes = (app: Application) => {
  app.use('/accounts', accountRoutes);
};

export default initRoutes;
