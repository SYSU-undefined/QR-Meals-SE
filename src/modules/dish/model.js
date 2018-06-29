import { query, escape } from '../db/service';

/**
 * @returns {Promise<Array<Dish & CategoryInDish>>}
 * @param {DishQueryParam & Limit} params
 */
export async function retrieveAllByConditions(params) {
  // finding without restaurant_id is not allowed
  if (!params.restaurant_id) return [];
  const restaurant_id = params.restaurant_id;
  const limit = params.limit || 10;
  // params: name, description, restaurant_id, category_name
  const { name, description, category_name } = params;
  const obj = { name, description, category_name };
  const param_arr = [];
  for (const key in obj) {
    if (obj[key]) {
      const val_esc = escape(obj[key]);
      param_arr.push(`${key} LIKE '%${val_esc}%'`);
    }
  }
  let querys = param_arr.join(' AND ');
  const sql = `SELECT dish_id, dish.name AS name, dish.description AS description,
               price,
               category.name AS category_name,
               category.description AS category_description
               FROM restaurant
               JOIN category ON dish.category_id = category.category_id
               limit ? WHERE ${querys} AND restaurant_id = ?`;
  const res = await query(sql, [limit, restaurant_id]);
  return res;
}

/**
 * @returns {Promise<number>}
 * @param {Dish} dish
 */
export async function create(dish) {
  if (!dish) return false;
  const sql = `INSERT INTO dish (name, description, restaurant_id, price) VALUES (?, ?, ?)`;
  const res = await query(sql, [dish.name, dish.restaurant_id, dish.price]);
  return res.insertId;
}

/**
 * @returns {Promise<Dish>}
 * @param {number} dish_id
 */
export async function retrieveOne(dish_id) {
  const sql = `SELECT dish_id, name, description, restaurant_id, price
               FROM dish WHERE dish_id = ?`;
  const [res] = await query(sql, [dish_id]);
  return res;
}

/**
 * @returns {Promise<boolean>}
 * @param {Dish} dish
 */
export async function updateOne(dish) {
  const sql = `UPDATE dish SET name = ?, description = ?, price = ?, restaurant_id = ? WHERE dish_id = ?`;
  await query(sql, [dish.name, dish.description, dish.price, dish.restaurant_id, dish.dish_id]);
}

/**
 * @returns {Promise<boolean>}
 * @param {number} dish_id
 */
export async function deleteOne(dish_id) {
  const sql = `DELETE FROM dish WHERE dish_id = ?`;
  await query(sql, [dish_id]);
  return true;
}
