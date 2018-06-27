import * as StaffModel from './model';

/**
 * @returns {Promise<object>}
 * @param {number} staff_id
 */
export async function getStaffPost(staff_id) {
  return await StaffModel.retrieveOne(staff_id);
}
