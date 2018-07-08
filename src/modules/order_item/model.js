import { query } from '../db/service';

/**
 * @returns {Promise<Array<OrderItem>>}
 * @param {number} order_id
 */
export async function getOrderItemsByOrder(order_id) {
  const sql = `SELECT item_id, order_id, dish_id, unit_price, quantity
               item_price FROM order_item WHERE order_id = ?`;
  const res = await query(sql, [order_id]);
  return res;
}

/**
 * @returns {Promise<boolean>}
 * @param {OrderItem} order_item
 */
export async function createOrderItem(order_item) {
  const sql = `INSERT INTO order_item (order_id, dish_id, unit_price, quantity) VALUES (?,?,?,?)`;
  return query(sql, [order_item.order_id, order_item.dish_id, order_item.unit_price, order_item.quantity]);
}

/**
 * @returns {Promise<OrderItem>}
 * @param {number} order_item_id
 */
export async function getOrderItemInfo(order_item_id) {
  const sql = `SELECT item_id, order_id, dish_id, unit_price, quantity, item_price
               FROM order_item WHERE item_id = ?`;
  const [res] = await query(sql, [order_item_id]);
  return res;
}

/**
 * @returns {Promise<boolean>}
 * @param {OrderItem} order_item
 */
export async function modifyOrderItemInfo(order_item) {
  const sql = `UPDATE order_item SET order_id = ?, dish_id = ?,
               unit_price = ?, quantity = ?, item_price = ?
               WHERE item_id = ?`;
  await query(sql, [order_item.order_id, order_item.dish_id,
    order_item.unit_price, order_item.quantity,
    order_item.item_price, order_item.item_id]);
  return true;
}

/**
 * @returns {Promise<boolean>}
 * @param {number} order_item_id
 */
export async function deleteOrderItem(order_item_id) {
  const sql = `DELETE FROM order_item WHERE item_id = ?`;
  await query(sql, [order_item_id]);
  return true;
}
