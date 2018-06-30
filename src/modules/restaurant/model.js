import { query, escape } from '../db/service';

/**
 * @returns {Promise<Array<Restaurant>>}
 * @param {RestaurantQueryParam & Limit} params
 */
export async function retrieveAllByConditions(params) {
  const limit = params.limit || 10;
  // params: name, description
  const { name, description, location } = params;
  const obj = { name, description, location };
  const param_arr = [];
  for (const key in obj) {
    if (obj[key]) {
      const val_esc = escape(obj[key]);
      param_arr.push(`${key} LIKE '%${val_esc}%'`);
    }
  }
  const querys = param_arr.join(' AND ');
  let sql = '';
  if (querys.length > 0) {
    sql = `SELECT restaurant_id, name, description, location FROM restaurant
            limit ? WHERE ${querys}`;
  } else {
    sql = `SELECT restaurant_id, name, description, location FROM restaurant limit ?`;
  }
  const res = await query(sql, [limit]);
  return res;
}

/**
 * @returns {Promise<Boolean>}
 * @param {Restaurant} restaurant
 */
export async function create(restaurant) {
  if (!restaurant) {
    return false;
  } else {
    const sql = `INSERT INTO restaurant (name, description, location) VALUES (?, ?, ?)`;
    await query(sql, [restaurant.name, restaurant.description, restaurant.location]);
    return true;
  }
}

/**
 * @returns {Promise<Restaurant>}
 * @param {number} restaurant_id
 */
export async function retrieveOne(restaurant_id) {
  const sql = `SELECT restaurant_id, name, description, location FROM restaurant
               WHERE restaurant_id = ?`;
  const [res] = await query(sql, [restaurant_id]);
  return {
    restaurant_id: res.restaurant_id,
    name: res.name,
    description: res.description,
    location: res.location
  };
}

/**
 * @returns {Promise<Boolean>}
 * @param {Restaurant} restaurant
 */
export async function updateOne(restaurant) {
  const sql = `UPDATE restaurant SET name = ?, description = ?, location = ? WHERE restaurant_id = ?`;
  await query(sql, [restaurant.name, restaurant.description, restaurant.location, restaurant.restaurant_id]);
  return true;
}

/**
 * @returns {Promise<Boolean>}
 * @param {number} restaurant_id
 */
export async function deleteOne(restaurant_id) {
  const sql = `DELETE FROM restaurant WHERE restaurant_id = ?`;
  await query(sql, [restaurant_id]);
  return true;
}
