import { findStaffByStaffId } from './model';

/**
 *
 * @param {number} staff_id
 */
export async function getStaffPost(staff_id) {
  return await findStaffByStaffId(staff_id);
}
