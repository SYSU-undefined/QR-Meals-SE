import { query, escape } from '../db/service';

/**
 * @returns {Promise<Array<Dish>>}
 * @param {*} params
 */
export async function findDishByConditions(params) {
  // finding without restaurant_id is not allowed
  if (!params.restaurant_id) return [];
  const restaurant_id = params.restaurant_id;
  const limit = params.limit || 10;
  // params: name, description, restaurant_id
  const { name, description } = params;
  const obj = { name, description };
  const param_arr = [];
  for (const key in obj) {
    if (obj[key]) {
      const val_esc = escape(obj[key]);
      param_arr.push(`${key} LIKE '%${val_esc}%'`);
    }
  }
  const querys = param_arr.join(' AND ');
  const sql = `SELECT dish_id, name, description, price FROM restaurant limit ? WHERE ${querys} AND restaurant_id = ?`;
  const res = await query(sql, [limit, restaurant_id]);
  return res;
}

/**
 * @returns {Promise<boolean>}
 * @param {Dish} dish
 */
export async function createDish(dish) {
  if (!dish) return false;
  const sql = `INSERT INTO dish (name, description, restaurant_id, price) VALUES (?, ?, ?)`;
  await query(sql, [dish.name, dish.restaurant_id, dish.price]);
  return true;
}

/**
 * @returns {Promise<Dish>}
 * @param {number} dish_id
 */
export async function getDishInfo(dish_id) {
  const sql = `SELECT dish_id, name, description, restaurant_id, price`;
  const [res] = await query(sql, [dish_id]);
  return res;
}

/**
 * @returns {Promise<boolean>}
 * @param {Dish} dish
 */
export async function modifyDishInfo(dish) {
  const sql = `UPDATE dish SET name = ?, description = ?, price = ?, restaurant_id = ? WHERE dish_id = ?`;
  await query(sql, [dish.name, dish.description, dish.price, dish.restaurant_id, dish.dish_id]);
}

/**
 * @returns {Promise<boolean>}
 * @param {Dish} dish
 */
export async function deleteDish(dish) {
  const sql = `DELETE FROM dish  WHERE dish_id = ?`;
  await query(sql, [dish.dish_id]);
  return true;
}