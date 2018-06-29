import { query } from '../db/service';

/**
 * @returns {Promise<object>}
 * @param {number} staff_id
 */
export async function retrieveOne(staff_id) {
  const sql = `SELECT staff_id, restaurant_id, post, name FROM staff
               WHERE staff_id = ?`;
  const res = await query(sql, [staff_id]);
  const ret = {};
  res.forEach((v) => {
    ret[v.restaurant_id] = {
      post: v.post,
      name: v.name
    };
  });
  /*
  {
    restarant_id_0: {
      post: post
      name: name
    },
    restarant_id_1: {
      post: post
      name: name
    },
    ...
  }
   */
  return ret;
}
