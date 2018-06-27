import Router from 'koa-express-router';

import { login, checkAuth, logout } from './controller';

const authRtr = new Router();

authRtr.route('/').post(login).get(checkAuth).delete(logout);

export default authRtr;
