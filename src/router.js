import Router from 'koa-express-router';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';

import { sessionKey } from './config';
import authRtr from './modules/auth/router';

// import RedisStore from 'koa-redis';

// import { redisClient } from './modules/redis/service';

export default function setRoute(app) {
  const apiRtr = new Router({ prefix: '/api' });
  app.use(apiRtr.routes(false));

  // 使用 session, bodyparser 中间件
  apiRtr.use(getSessionMid(app), getBodyParserMid());

  apiRtr.use('/auth', authRtr.routes());
}

function getSessionMid(app) {
  const CONFIG = {
    key: sessionKey,
    maxAge: 24 * 60 * 60 * 1000,
    renew: true,
    // store: new RedisStore({ client: redisClient })
  };
  return session(CONFIG, app);
}

function getBodyParserMid() {
  return bodyParser();
}
