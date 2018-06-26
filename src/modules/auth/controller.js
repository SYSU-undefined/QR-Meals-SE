import { authWithUsernamePassword } from './model';
import { md5 } from '../../utils';
import { salt } from '../../config';
import { AE } from '../../utils';

function encryptPassword(password) {
  return md5(`${password}${salt}`);
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function checkAuth(ctx, next) {
  if ('user' in ctx.session) {
    // 已认证
    return ctx.setResp('已认证', true, null, AE.OK);
  } else {
    // 未认证
    return ctx.setResp('未认证', false, null, AE.NOT_AUTHORIZED);
  }
  // await next();
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function login(ctx, next) {
  // TODO: 微信登录与后台登录逻辑有区别
  if ('user' in ctx.session) {
    // 已认证
    return ctx.setResp('已认证，无需重新登录', null, null, AE.OK);
  } else {
    // 未认证，尝试认证
    const { username, password } = ctx.request.body;
    const password_enc = encryptPassword(password);
    const auth_res = await authWithUsernamePassword(username, password_enc);
    if (auth_res == null) {
      // 认证失败
      return ctx.setResp('认证失败', null, null, AE.WRONG_PASSWORD);
    } else {
      // 认证成功，设置session
      ctx.session.user = {
        // TODO: may be modified
        id: auth_res.id,
        // TODO: there may be role
      };
      return ctx.setResp('认证成功', null, null, AE.OK);
    }
  }
}

/**
 *
 * @param {Context} ctx
 * @param {INext} next
 */
export async function logout(ctx, next) {
  if ('user' in ctx.session) {
    // 登出
    delete ctx.session['user'];
    return ctx.setResp('登出成功', null, null, AE.OK);
  } else {
    // 此用户未登录
    return ctx.setResp('未认证', null, null, AE.NOT_AUTHORIZED);
  }
}
