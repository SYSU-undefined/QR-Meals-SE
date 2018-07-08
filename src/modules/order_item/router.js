import Router from 'koa-express-router';

import { parseOrderItem, retrieveAllorderItems, createOrderItem, retrieveOneOrderItem, updateOrderItem, deleteOrderItem } from './controller';

import { exportRtr } from '../../utils';

const orderItemRouter = new Router();

orderItemRouter.route('/')
  .get(retrieveAllorderItems)
  .post(createOrderItem);

orderItemRouter.param('order_meal_id', parseOrderItem);

const idRtr = new Router();

orderItemRouter.use('/:order_meal_id', exportRtr(idRtr));

idRtr.route('/')
  .get(retrieveOneOrderItem)
  .delete(deleteOrderItem);

export const orderItemIdRouter = idRtr;

export default orderItemRouter;
