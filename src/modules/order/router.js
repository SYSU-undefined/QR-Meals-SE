import Router from 'koa-express-router';

import { parseOrder, retrieveAllOrders, createOrder, retrieveOneorder, deleteOrder } from './controller';
import orderItemRouter from '../order_item/router';
import { exportRtr } from '../../utils';

const orderRouter = new Router();

orderRouter.route('/')
  .get(retrieveAllOrders)
  .post(createOrder);

orderRouter.param('order_id', parseOrder);

const idRtr = new Router();

orderRouter.use('/:order_id', exportRtr(idRtr));

idRtr.route('/')
  .get(retrieveOneorder)
  .delete(deleteOrder);

idRtr.use('/meal', exportRtr(orderItemRouter));

export const orderIdRouter = idRtr;

export default orderRouter;
