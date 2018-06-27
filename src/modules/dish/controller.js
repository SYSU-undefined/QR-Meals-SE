import * as DishModel from './model';
import { uploadDishImg, downloadDishImg } from '../file/service';
import { SoftError } from '../../utils/AE';
import { AE } from '../../utils';

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function retrieveAllDishes(ctx, next) {
  const { limit, name, description } = ctx.query;
  const param = { limit, name, description };
  const res = await DishModel.retrieveAllByConditions(param);
  return ctx.setResp('查询成功', res);
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function createDish(ctx, next) {
  const file = ctx.request.file;
  const { name, description, price } = ctx.request.body;
  if (!(file && name && description && price)) {
    throw new SoftError(AE.BAD_REQUEST, '参数不完整');
  }
  const restaurant_id = ctx.paramData.restaurant.restaurant_id;

  const dish = { name, description, price, restaurant_id };

  // 将信息插入数据库
  const insertId = await DishModel.create(dish);
  // 上传头像
  await uploadDishImg(insertId, file);
  return await ctx.setResp('创建菜品成功');
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 * @param {number} id
 */
export async function parseDish(ctx, next, id) {
  const { paramData } = ctx;
  const dish = await DishModel.retrieveOne(id);
  paramData.dish = dish;

  // 无此菜品 或 不是这家店的菜品
  if (!dish || dish.restaurant_id != paramData.restaurant.restaurant_id) {
    throw new SoftError(AE.NOT_FOUND, '不存在的菜品');
  }

  // post 在 parseRestaurant时已经获取

  return await next();
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 * @param {number} id
 */
export async function retrieveOneDish(ctx, next, id) {
  // 从 parseDish 中已经查询到了 dish
  const { dish } = ctx.paramData;
  return await ctx.setResp('查询成功', dish);
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 * @param {number} id
 */
export async function updateOneDish(ctx, next, id) {
  const { post } = ctx.paramData;
  if (post !== 'admin') {
    throw new SoftError(AE.NO_PERMISSION, '权限不足');
  }

  const { name, description, restaurant_id, price } = ctx.request.body;
  const newDish = { dish_id: id, name, description, restaurant_id, price };
  await DishModel.updateOne(newDish);

  return ctx.setResp('菜品信息更新成功')
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 * @param {number} id
 */
export async function deleteOneDish(ctx, next, id) {
  const { post } = ctx.paramData;
  if (post !== 'admin') {
    throw new SoftError(AE.NO_PERMISSION, '权限不足');
  }

  await DishModel.deleteOne(id);

  return await ctx.setResp('删除成功');
}
