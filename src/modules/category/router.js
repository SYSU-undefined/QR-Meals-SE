import Router from 'koa-express-router';

import { createCategory, retrieveAllCategories } from './controller';

const categoryRouter = new Router();

categoryRouter.route('/')
  .get(retrieveAllCategories)
  .post(createCategory);

export default categoryRouter;
