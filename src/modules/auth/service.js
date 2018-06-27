import rp from 'request-promise';
import { appid, appsecret } from '../../config';

/**
 *
 * @param {string} code code got by wx.login
 */
export async function authWX(code) {
  const options = {
    uri: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`,
    json: true
  };
  return await rp(options);
}
