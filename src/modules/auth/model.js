import { query } from '../db/service';

/**
 * @returns {Promise<Admin>}
 * @param {string} username
 * @param {string} password
 */
export async function retrieveOneByUserPass(username, password) {
  const sql = `SELECT admin_id, restaurant_id, username,
               password, realname
               FROM admin
               WHERE username = ? AND password = ?`;
  const values = [username, password];
  const [res] = await query(sql, values);
  return res;
}
