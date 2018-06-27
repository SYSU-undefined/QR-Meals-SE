import { query } from '../db/service';

/**
 * @returns {Promise<Admin>}
 * @param {number} admin_id
 */
export async function retrieveOne(admin_id) {
  const sql = `SELECT admin_id, restaurant_id, username, realname FROM admin
               WHERE admin_id = ?`;
  const [res] = await query(sql, [admin_id]);
  return res;
}
