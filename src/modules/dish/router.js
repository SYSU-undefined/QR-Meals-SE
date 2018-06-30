import Router from 'koa-express-router';

import { parseDish, retrieveAllDishes, createDish, retrieveOneDish, updateOneDish, deleteOneDish, retrieveDishImg } from './controller';

import { exportRtr } from '../../utils';
import multer from '../../utils/multer';

const dishRouter = new Router();

const upload = multer();

dishRouter.route('/')
  .get(retrieveAllDishes)
  .post(
    upload.single('image'),
    createDish
  );

dishRouter.param('dish_id', parseDish);

const idRtr = new Router();

dishRouter.use('/:dish_id', exportRtr(idRtr));

idRtr.route('/')
  .get(retrieveOneDish)
  .put(
    upload.single('image'),
    updateOneDish
  )
  .delete(deleteOneDish);

idRtr.route('/image').get(retrieveDishImg);

export const dishIdRouter = idRtr;

export default dishRouter;
