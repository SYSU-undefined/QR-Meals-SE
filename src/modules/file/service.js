import { fs } from '../../config';
import rp from 'request-promise';
import { SoftError } from '../../utils/AE';
import { AE } from '../../utils';

const fs_url = fs.url;

/**
 *
 * @param {number} dish_id
 * @param {file} file
 */
export async function uploadDishImg(dish_id, file) {
  const uri = `/dish_img/${dish_id}.jpg`;
  const option = {
    method: 'POST',
    url: fs_url + uri,
    formData: {
      file: Buffer.from(file.buffer)
    }
  };
  try {
    return await rp(option);
  } catch (err) {
    console.log(err);
    throw new SoftError(AE.INTERNAL_ERROR, '文件系统错误');
  }
}

/**
 *
 * @param {number} dish_id
 */
export async function downloadDishImg(dish_id) {
  const uri = `/dish_img/${dish_id}.jpg`;
  const option = {
    method: 'GET',
    uri: fs_url + uri,
  };
  try {
    const file = await rp(option);
    return file;
  } catch (err) {
    throw new SoftError(AE.INTERNAL_ERROR, '文件系统错误');
  }
}
