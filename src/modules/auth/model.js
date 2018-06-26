import { query } from '../db/service';

/**
 * @returns {Promise<Admin>}
 * @param {string} username
 * @param {string} password
 */
export async function authWithUsernamePassword(username, password) {
  const sql = `SELECT admin_id, username, staff_id,
               restaurant_id, authority, name
               FROM admin
               JOIN staff ON admin.staff_id = staff.staff_id
               WHERE admin.username = ? AND admin.password = ?`;
  const values = [username, password];
  const res = await query(sql, values);
  if (res.length <= 0) return null;
  const ret = {
    admin_id: res.admin_id,
    username: res.username,
    staff: []
  };
  for (const staff in res) {
    ret.staff.push({
      staff_id: staff.admin_id,
      restaurant_id: staff.restaurant_id,
      authority: staff.authority,
      name: staff.name
    });
  }
  return ret;
}

/**
 * @returns {Promise<Array<Staff>>}
 * @param {number} open_id
 */
export async function authWithId(open_id) {

}
