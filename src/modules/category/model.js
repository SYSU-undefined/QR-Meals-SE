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
export async function create(category) {
  const sql = `INSERT INTO category (name, description)
               VALUES (?, ?)`;
  const res = await query(sql, [category.name, category.description]);
  return res.insertId;
}

/**
 *
 * @param {Category} category
 */
export async function updateOne(category) {
  const sql = `UPDATE category SET name = ?, description = ?
               WHERE category_id = ?`;
  await query(sql, [category.name, category.description, category.category_id]);
}

/**
 * @returns {Category}
 * @param {number} category_id
 */
export async function retrieveOne(category_id) {
  const sql = `SELECT category_id, name, description FROM category
               WHERE category_id = ?`;
  const [category] = await query(sql, [category_id]);
  return category;
}

/**
 *
 * @param {number} category_id
 */
export async function deleteOne(category_id) {
  const sql = `DELETE FROM category WHERE category_id = ?`;
  await query(sql, [category_id]);
}
