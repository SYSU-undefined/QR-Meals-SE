import Router from 'koa-express-router';

import { login, checkAuth } from './controller';

const authRtr = new Router();

authRtr.route('/').post(login).get(checkAuth);

export default authRtr;
