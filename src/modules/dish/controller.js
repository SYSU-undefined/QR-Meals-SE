import * as DishModel from './model';

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
  const restaurant_id = ctx.paramData.restaurant.restaurant_id;

  const dish = { name, description, price, restaurant_id };

  // 将信息插入数据库
  const insertId = await DishModel.create(dish);
  // 上传头像
  // TODO: DTC Working here
}
