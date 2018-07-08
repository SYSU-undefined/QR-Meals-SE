import * as OrderItemModel from './model';
import * as DishModel from '../dish/model';
import { SoftError } from '../../utils/AE';
import { AE } from '../../utils';

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function retrieveAllOrderItems(ctx, next) {
  const { order: { order_id }} = ctx.paramData;
  const res = await OrderItemModel.getOrderItemsByOrder(Number(order_id));
  return ctx.setResp('查询成功', res);
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function createOrderItem(ctx, next) {
  const { order: { order_id }} = ctx.paramData;
  const { dish_id, quantity } = ctx.request.body;
  if (!(dish_id && quantity)) {
    throw new SoftError(AE.BAD_REQUEST, '参数不完整');
  }

  const { price: unit_price } = await DishModel.retrieveOne(dish_id);
  const orderItem = { unit_price, order_id, dish_id, quantity };

  const { insertId } = await OrderItemModel.createOrderItem(orderItem);
  return ctx.setResp('增加菜式成功', {
    item_id: insertId
  });
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 * @param {number} id
 */
export async function parseOrderItem(ctx, next, id) {
  const { paramData } = ctx;
  const orderItem = await OrderItemModel.getOrderItemInfo(Number(id));
  paramData.orderItem = orderItem;

  if (!orderItem || orderItem.order_id !== paramData.order.order_id) {
    throw new SoftError(AE.NOT_FOUND, '不存在的订单菜式');
  }

  return next();
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 * @param {number} id
 */
export async function retrieveOneOrderItem(ctx, next) {
  const { orderItem } = ctx.paramData;
  return ctx.setResp('查询成功', orderItem);
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function deleteOrderItem(ctx, next) {
  const { post } = ctx.paramData;
  if (post !== 'admin') {
    throw new SoftError(AE.NO_PERMISSION, '权限不足');
  }

  const { item_id } = ctx.paramData.orderItem;
  await OrderItemModel.deleteOrderItem(item_id);

  return await ctx.setResp('删除成功');
}
