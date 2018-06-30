import Router from 'koa-express-router';

import { createRestaurant, retrieveAllRestaurants, retrieveOneRestaurant, deleteOneRestaurant, updateOneRestaurant } from './controller';
import { parseRestaurant } from './controller';
import { exportRtr } from '../../utils';

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

export default restaurantRouter;
