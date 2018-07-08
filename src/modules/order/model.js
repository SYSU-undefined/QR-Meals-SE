import { query } from '../db/service';

/**
 * @returns {Promise<Array<Order>>}
 * @param {*} params restaurant_id, limit
 */
export async function getOrders(params) {
  const { restaurant_id, customer_id } = params;
  let { limit } = params;
  if (!restaurant_id) return [];
  limit = limit || 10;
  if (customer_id) {
    const sql = `SELECT order_id, restaurant_id, customer_id, item_count,
                total_price, desk_id, created_at FROM \`order\`
                WHERE restaurant_id = ? AND customer_id = ?
                limit ?`;
    const res = await query(sql, [restaurant_id, customer_id, limit]);
    return res;
  } else {
    const sql = `SELECT order_id, restaurant_id, customer_id, item_count,
                total_price, desk_id, created_at FROM \`order\` WHERE restaurant_id = ?
                limit ?`;
    const res = await query(sql, [restaurant_id, limit]);
    return res;
  }
}

/**
 * @returns {Promise<boolean>}
 * @param {Order} order
 */
export async function createOrder(order) {
  if (!order) return false;
  const sql = `INSERT INTO \`order\` (restaurant_id, customer_id, item_count,
               total_price, desk_id) VALUES (?,?,?,?,?)`;
  await query(sql, order.restaurant_id, order.customer_id,
    order.item_count, order.total_price, order.desk_id);
  return true;
}

/**
 * @returns {Promise<Order>}
 * @param {number} order_id
 */
export async function getOrderInfo(order_id) {
  const sql = `SELECT order_id, restaurant_id, customer_id, item_count,
               total_price, created_at, desk_id FROM \`order\`
               WHERE order_id = ?`;
  const [res] = await query(sql, order_id);
  return res;
}

/**
 * @returns {Promise<boolean>}
 * @param {Order} order
 */
export async function modifyOrderInfo(order) {
  const sql = `UPDATE \`order\` SET restaurant_id = ?, customer_id = ?,
               item_count = ?, total_price = ?, desk_id = ?`;
  await query(sql, [order.restaurant_id, order.customer_id,
    order.item_count, order.total_price, order.desk_id]);
}

/**
 * @returns {Promise<boolean>}
 * @param {number} order_id
 */
export async function deleteOrder(order_id) {
  const sql = `DELETE FROM \`order\` WHERE order_id = ?`;
  await query(sql, [order_id]);
  return true;
}
