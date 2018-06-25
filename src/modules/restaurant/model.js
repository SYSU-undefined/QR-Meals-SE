import { query, escape } from '../db/service';

/**
 * @returns {Promise<Array<Restaurant>>}
 * @param {*} params
 */
export async function findRestaurantByConditions(params) {
  const limit = params.limit || 10;
  if (!params) {
    // no params
    const sql = `SELECT restaurant_id, name, location FROM restaurant limit ?`;
    const res = await query(sql, [limit]);
    return res;
  } else {
    // params: name, location
    const { name, location } = params;
    const obj = { name, location };
    const param_arr = [];
    for (const key in obj) {
      if (obj[key]) {
        const val_esc = escape(obj[key]);
        param_arr.push(`${key} LIKE '%${val_esc}%'`);
      }
    }
    const querys = param_arr.join(' AND ');
    const sql = `SELECT restaurant_id, name, location FROM restaurant limit ? WHERE ${querys}`;
    const res = await query(sql, [limit]);
    return res;
  }
}

/**
 * @returns {Promise<Boolean>}
 * @param {Restaurant} restaurant
 */
export async function createRestaurant(restaurant) {
  if (!restaurant) {
    return false;
  } else {
    const sql = `INSERT INTO restaurant (name, location) VALUES (?, ?)`;
    await query(sql, [restaurant.name, restaurant.location]);
    return true;
  }
}

/**
 * @returns {Promise<Restaurant>}
 * @param {number} restaurant_id
 */
export async function getRestaurantInfo(restaurant_id) {
  const sql = `SELECT restaurant_id, name, location FROM restaurant WHERE restaurant_id = ?`;
  const [res] = await query(sql, [restaurant_id]);
  return res;
}

/**
 * @returns {Promise<Boolean>}
 * @param {Restaurant} restaurant
 */
export async function modifyRestaurantInfo(restaurant) {
  const sql = `UPDATE restaurant SET name = ? AND location = ? WHERE restaurant_id = ?`;
  await query(sql, [restaurant.name, restaurant.location, restaurant.restaurant_id]);
  return true;
}

/**
 * @returns {Promise<Boolean>}
 * @param {Restaurant} restaurant
 */
export async function deleteRestaurant(restaurant) {
  const sql = `DELETE FROM restaurant WHERE restaurant_id = ?`;
  await query(sql, [restaurant.restaurant_id]);
  return true;
}
