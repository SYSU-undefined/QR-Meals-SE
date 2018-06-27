import { findStaffByStaffId } from './model';

/**
 *
 * @param {number} staff_id
 */
export async function getStaffAuthority(staff_id) {
  return await findStaffByStaffId(staff_id);
}
