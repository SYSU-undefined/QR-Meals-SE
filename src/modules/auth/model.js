import { query, getConn } from '../db/service';

export async function auth(username, password) {
  const sql = 'TODO';
  const values = [username, password];
  const conn = await getConn();
  const [res] = await query(sql, values);
  conn.release();
  return res;
}
