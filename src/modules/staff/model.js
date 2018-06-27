import { query } from '../db/service';

/**
 * @returns
 * @param {number} staff_id
 */
export async function findStaffByStaffId(staff_id) {
  const sql = `SELECT staff_id, restaurant_id, authority, name FROM staff
               WHERE staff_id = ?`;
  const res = await query(sql, staff_id);
  const ret = {};
  res.forEach((v) => {
    if (!(v.restaurant_id in ret)) {
      ret[v.restaurant_id] = {};
      ret[v.restaurant_id][v.authority] = v.name;
    } else {
      const d = {};
      d[v.authority] = v.name;
      ret[v.restaurant_id].push(d);
    }
  });
  /*
  {
    restarant_id_0: {
      authority: name
    },
    restarant_id_1: {
      authority: name,
      authority2: name2,
      ...
    },
    ...
  }
   */
  return ret;
}
