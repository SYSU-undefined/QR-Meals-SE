import * as CategoryModel from './model';
import { SoftError } from '../../utils/AE';
import { AE } from '../../utils';

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

  const insertId = await CategoryModel.create(category);

  return ctx.setResp('创建成功', {
    category_id: insertId
  });
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function parseCategory(ctx, next, id) {
  const { paramData } = ctx;
  const category = await CategoryModel.retrieveOne(id);
  paramData.category = category;
  if (!category) {
    throw new SoftError(AE.NOT_FOUND, '不存在的目录');
  }
  return await next();
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function updateCategory(ctx, next) {
  const { category_id } = ctx.paramData.category;
  const { name, description } = ctx.request.body;
  const category = { category_id, name, description };
  await CategoryModel.updateOne(category);
  return ctx.setResp('更新成功');
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function deleteCategory(ctx, next) {
  const { category_id } = ctx.paramData.category;
  await CategoryModel.deleteOne(category_id);
  return ctx.setResp('删除成功');
}
