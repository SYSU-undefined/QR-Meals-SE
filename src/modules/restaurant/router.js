import Router from 'koa-express-router';

import { createRestaurant, retrieveAllRestaurants, retrieveOneRestaurant, deleteOneRestaurant, updateOneRestaurant } from './controller';
import { parseRestaurant } from './controller';
import { exportRtr } from '../../utils';
import dishRouter from '../dish/router';
import orderRouter from '../order/router';

const restaurantRouter = new Router();

restaurantRouter.route('/')
  .get(retrieveAllRestaurants)
  .post(createRestaurant);

restaurantRouter.param('restaurant_id', parseRestaurant);

const idRtr = new Router();

restaurantRouter.use('/:restaurant_id', exportRtr(idRtr));

idRtr.route('/')
  .get(retrieveOneRestaurant)
  .put(updateOneRestaurant)
  .delete(deleteOneRestaurant);

// Path: /restaurnat/:restaurant_id/dish
idRtr.use('/dish', exportRtr(dishRouter));
idRtr.use('/order', exportRtr(orderRouter));

export const restaurantIdRouter = idRtr;

export default restaurantRouter;
