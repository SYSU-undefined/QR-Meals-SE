import * as AdminModel from './model';
import { md5 } from '../../utils';
import { salt } from '../../config';
import { AE } from '../../utils';
import { authWX } from './service';
import { getStaffPost } from '../staff/service';
import { SoftError } from '../../utils/AE';

function encryptPassword(password) {
  return md5(`${password}${salt}`);
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function checkAuth(ctx, next) {
  if (ctx.session.auth_type) {
    const staff_info = await getStaffPost(openid);
    return ctx.setResp('已认证', staff_info);
  } else {
    // 未认证
    throw new SoftError(AE.NOT_AUTHORIZED, '未认证');
  }
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function login(ctx, next) {
  // 后台登录逻辑 而非 微信登录
  if (ctx.session.auth_type) {
    // 已认证
    return ctx.setResp('已认证，无需重新登录');
  } else {
    // 未认证，尝试认证
    const { username, password } = ctx.request.body;
    const password_enc = encryptPassword(password);
    const auth_res = await AdminModel.retrieveOneByUserPass(username, password_enc);
    if (auth_res == null) {
      // 认证失败
      throw new SoftError(AE.WRONG_PASSWORD, '认证失败');
    } else {
      // 认证成功，设置session
      ctx.session.auth_type = 'userpass';
      ctx.session.admin_id = auth_res.admin_id;
      return ctx.setResp('认证成功');
    }
  }
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function loginWithWX(ctx, next) {
  if (ctx.session.auth_type === 'openid') {
    const { openid } = ctx.session;
    const staff_info = await getStaffPost(openid);
    return ctx.setResp('已登录，无需重复登录', staff_info);
  }

  const { code } = ctx.request.body;
  const { openid, session_key } = await authWX(code);
  ctx.session.auth_type = 'openid';
  ctx.session.openid = openid;
  ctx.session.session_key = session_key;

  const staff_info = await getStaffPost(openid);

  // ctx.session.staff_info = staff_info;

  // 用于前端的权限管理
  return ctx.setResp('登录成功', staff_info);
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function logout(ctx, next) {
  if (ctx.session.auth_type) {
    // 登出
    delete ctx.session.auth_type;
    return ctx.setResp('登出成功', null, null, AE.OK);
  } else {
    // 此用户未登录
    throw new SoftError(AE.NOT_AUTHORIZED, '未认证');
  }
}
