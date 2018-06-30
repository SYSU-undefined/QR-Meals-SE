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
  const { restaurant_id } = ctx.paramData.restaurant;
  const { limit, name, description, category_name } = ctx.query;
  const param = { limit, name, description, category_name, restaurant_id };
  const res = await DishModel.retrieveAllByConditions(param);
  const ret = {};
  for (let i = 0; i < res.length; ++i) {
    if (!(res[i].category_name in ret)) {
      ret[res[i].category_name] = [];
    }
    ret[res[i].category_name].push(res[i]);
  }
  return ctx.setResp('查询成功', ret);
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function createDish(ctx, next) {
  const file = ctx.request.file;
  const { name, description, price, category_id } = ctx.request.body;
  if (!(file && name && description && price && category_id)) {
    throw new SoftError(AE.BAD_REQUEST, '参数不完整');
  }
  const restaurant_id = ctx.paramData.restaurant.restaurant_id;

  const dish = { name, description, price, restaurant_id, category_id };

  // 将信息插入数据库
  const insertId = await DishModel.create(dish);
  // 上传图片
  await uploadDishImg(insertId, file);
  return await ctx.setResp('创建菜品成功', {
    dish_id: insertId
  });
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
  if (!dish || dish.restaurant_id !== paramData.restaurant.restaurant_id) {
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
export async function retrieveOneDish(ctx, next) {
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
export async function updateOneDish(ctx, next) {
  const { post } = ctx.paramData;
  const { dish_id } = ctx.paramData.dish;
  if (post !== 'admin') {
    throw new SoftError(AE.NO_PERMISSION, '权限不足');
  }

  const { restaurant_id } = ctx.paramData.restaurant;

  const { name, description, category_id, price } = ctx.request.body;
  const file = ctx.request.file;

  const newDish = { dish_id, name, description, restaurant_id, price, category_id };
  // 更新信息
  await DishModel.updateOne(newDish);
  // 上传图片
  await uploadDishImg(dish_id, file);

  return ctx.setResp('菜品信息更新成功');
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 * @param {number} id
 */
export async function deleteOneDish(ctx, next) {
  const { post } = ctx.paramData;
  if (post !== 'admin') {
    throw new SoftError(AE.NO_PERMISSION, '权限不足');
  }

  const { dish_id } = ctx.paramData.dish;

  await DishModel.deleteOne(dish_id);

  return await ctx.setResp('删除成功');
}

export async function retrieveDishImg(ctx, next) {
  const { dish_id } = ctx.paramData.dish;
  const file = await downloadDishImg(dish_id);
  ctx.body = file;
  // ctx.type = 'image/jpg';
}
