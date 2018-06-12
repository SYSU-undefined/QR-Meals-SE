import Router from 'koa-express-router';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';

import { sessionKey } from './config';

export default function setRoute(app) {
  const apiRtr = new Router({ prefix: '/api' });
  app.use(apiRtr.routes(false));

  // 使用 session, bodyparser 中间件
  apiRtr.use(getSessionMid(app), getBodyParserMid());
}

function getSessionMid(app) {
  const CONFIG = {
    key: sessionKey,
    maxAge: 24 * 60 * 60 * 1000,
    renew: true
  };
  return session(CONFIG, app);
}

function getBodyParserMid() {
  return bodyParser();
}
