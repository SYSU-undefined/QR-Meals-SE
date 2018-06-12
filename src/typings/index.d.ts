import * as Koa from 'koa';
import KER from 'koa-express-router';
import * as mysql from 'mysql';

declare global {
  type Context = Koa.Context
  type KoaExpressRouter = KER
  type IMiddleware = (ctx : Context, next : INext) => Promise<any>
  type INext = () => Promise<any>
  type Application = Koa
  type MysqlConn = mysql.PoolConnection
  type MysqlPool = mysql.Pool
  type MysqlQueryable = MysqlConn | MysqlPool
}
