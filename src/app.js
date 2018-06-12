import Koa from 'koa';
import setRoute from './router';
import { appKeys } from './config';
import { setResp, handleError, handleException } from './utils';
import { logRequest } from './utils/logger';

const app = new Koa();
app.keys = appKeys;
app.context.setResp = setResp;
app.context.handleError = handleError;
app.use(handleException);
app.use(logRequest);
app.on('error', (e, ctx) => ctx.handleError(e));

setRoute(app);

export default app;
