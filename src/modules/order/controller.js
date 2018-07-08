import * as OrderModel from './model';
import { SoftError } from '../../utils/AE';
import { AE } from '../../utils';

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function retrieveAllOrders(ctx, next) {
  const { restaurant_id } = ctx.paramData.restaurant;
  const { openid: customer_id } = ctx.session;
  const { limit } = ctx.query;
  const param = { limit, customer_id, restaurant_id };
  const res = await OrderModel.getOrders(param);
  return ctx.setResp('查询成功', res);
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function createOrder(ctx, next) {
  const { desk_id } = ctx.request.body;
  if (!(desk_id)) {
    throw new SoftError(AE.BAD_REQUEST, '参数不完整');
  }
  const { restaurant_id } = ctx.paramData.restaurant;
  const { openid: customer_id } = ctx.session;

  const order = { restaurant_id, customer_id, item_count: 0, total_price: 0, desk_id };

  const insertId = await OrderModel.create(order);
  return await ctx.setResp('创建订单成功', {
    order_id: insertId
  });
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 * @param {number} id
 */
export async function parseOrder(ctx, next, id) {
  const { paramData } = ctx;
  const order = await OrderModel.getOrderInfo(id);
  paramData.order = order;

  if (!order || order.restaurant_id !== paramData.restaurant.restaurant_id) {
    throw new SoftError(AE.NOT_FOUND, '不存在的订单');
  }

  const { openid: customer_id } = ctx.session;
  if (order.customer_id !== customer_id) {
    throw new SoftError(AE.NO_PERMISSION, '权限不足');
  }

  return await next();
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 * @param {number} id
 */
export async function retrieveOneOrder(ctx, next) {
  const { order } = ctx.paramData;
  return await ctx.setResp('查询成功', order);
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 * @param {number} id
 */
export async function deleteOrder(ctx, next) {
  const { post } = ctx.paramData;
  if (post !== 'admin') {
    throw new SoftError(AE.NO_PERMISSION, '权限不足');
  }

  const { order_id } = ctx.paramData.order;

  await OrderModel.deleteOne(order_id);

  return await ctx.setResp('删除成功');
}
