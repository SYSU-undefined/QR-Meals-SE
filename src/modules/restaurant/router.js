import Router from 'koa-express-router';

import { createRestaurant, retrieveAllRestaurants, retrieveOneRestaurant, deleteOneRestaurant, updateOneRestaurant } from './controller';
import { parseRestaurant } from './controller';

const restaurantRouter = new Router();

restaurantRouter.route('/')
  .get(retrieveAllRestaurants)
  .post(createRestaurant);

restaurantRouter.route('/:restaurant_id')
  .get(retrieveOneRestaurant)
  .put(updateOneRestaurant)
  .delete(deleteOneRestaurant);

restaurantRouter.param('restaurant_id', parseRestaurant);

export default restaurantRouter;
