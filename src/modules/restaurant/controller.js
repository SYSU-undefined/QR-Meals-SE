import * as RestaurantModel from './model';
import * as AdminModel from '../admin/model';
import { SoftError } from '../../utils/AE';
import { AE } from '../../utils';
import { getStaffPost } from '../staff/service';

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 * @param {number} id
 */
export async function parseRestaurant(ctx, next, id) {
  const restaurant_id = id;
  ctx.paramData = {};
  const { paramData } = ctx;
  const restaurant = await RestaurantModel.retrieveOne(id);
  paramData.restaurant = restaurant;

  if (!restaurant) {
    throw new SoftError(AE.NOT_FOUND, '不存在的店家');
  }

  const { auth_type } = ctx.session;
  if (auth_type === 'userpass') {
    const admin = await AdminModel.retrieveOne(ctx.session.admin_id);
    if (restaurant_id === admin.restaurant_id) {
      paramData.post = 'admin';
      paramData.restaurant_id = restaurant_id;
    } else {
      paramData.post = 'customer';
    }
  } else if (auth_type === 'openid') {
    const { openid } = ctx.session;
    const staff_info = await getStaffPost(openid);
    if (restaurant_id in staff_info) {
      paramData.post = staff_info[restaurant_id].post;
      paramData.name = staff_info[restaurant_id].name;
    } else {
      paramData.post = 'customer';
    }
  }

  return await next();
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function retrieveAllRestaurants(ctx, next) {
  const { limit, name, description, location } = ctx.query;
  const param = { limit, name, description, location };
  const res = await RestaurantModel.retrieveAllByConditions(param);
  return ctx.setResp('查询成功', res);
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function createRestaurant(ctx, next) {
  // TODO: 创建店家时，需要对应创建Admin账号，逻辑需要讨论
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 * @param {number} id
 */
export async function retrieveOneRestaurant(ctx, next, id) {
  // 在 parse 时，已经拿到了 restaurant
  const { restaurant } = ctx.paramData;
  return ctx.setResp('查询成功', restaurant);
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 * @param {number} id
 */
export async function updateOneRestaurant(ctx, next, id) {
  const { post } = ctx.paramData;
  if (post !== 'admin') {
    throw new SoftError(AE.NO_PERMISSION, '权限不足');
  }

  const { name, location, description } = ctx.request.body;

  const newRestaurant = {
    restaurant_id: id,
    name,
    location,
    description
  };
  await RestaurantModel.updateOne(newRestaurant);

  return ctx.setResp('店家信息更新成功');
}

export async function deleteOneRestaurant(ctx, next, id) {
  const { post } = ctx.paramData;
  if (post !== 'admin') {
    throw new SoftError(AE.NO_PERMISSION, '权限不足');
  }

  await RestaurantModel.deleteOne(id);

  return await ctx.setResp('删除成功');
}
