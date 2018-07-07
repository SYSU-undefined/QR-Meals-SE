import * as CategoryModel from './model';

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function retrieveAllCategories(ctx, next) {
  const res = await CategoryModel.retriveAllByConditions();
  return ctx.setResp('查询成功', res);
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function createCategory(ctx, next) {
  const { name, description } = ctx.request.body;
  const category = { name, description };

  const insertId = await CategoryModel.createCategory(category);

  return ctx.setResp('创建成功', {
    category_id: insertId
  });
}
