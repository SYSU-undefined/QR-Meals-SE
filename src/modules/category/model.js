import { query } from '../db/service';

/**
 * @returns {Promise<Array<Category>>}
 * @param {null} params
 */
export async function retriveAllByConditions(params) {
  // ignore params now
  const sql = `SELECT * FROM \`category\``;
  const res = await query(sql);
  return res;
}

/**
 * @returns {number} insertid
 * @param {Category} category
 */
export async function createCategory(category) {
  const sql = `INSERT INTO category (name, description)
               VALUES (?, ?)`;
  const res = await query(sql, [category.name, category.description]);
  return res.insertId;
}
