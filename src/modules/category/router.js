import Router from 'koa-express-router';

import { createCategory, retrieveAllCategories, updateCategory, parseCategory, deleteCategory } from './controller';
import { exportRtr } from '../../utils';

const categoryRouter = new Router();

categoryRouter.route('/')
  .get(retrieveAllCategories)
  .post(createCategory);

categoryRouter.param('category_id', parseCategory);

const idRtr = new Router();

categoryRouter.use('/:category_id', exportRtr(idRtr));

idRtr.route('/')
  .put(updateCategory)
  .delete(deleteCategory);

export default categoryRouter;
