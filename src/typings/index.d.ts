import * as QRSE from 'qrse';
import * as Koa from 'koa';
import KER from 'koa-express-router';
import * as mysql from 'mysql';

declare global {
  type Context = Koa.Context & QRSE.Context
  type KoaExpressRouter = KER
  type IMiddleware = (ctx : Context, next : INext) => Promise<any>
  type INext = () => Promise<any>
  type Application = Koa
  type MysqlConn = mysql.PoolConnection
  type MysqlPool = mysql.Pool
  type MysqlQueryable = MysqlConn | MysqlPool

  type Staff = QRSE.Staff
  type Admin = QRSE.Admin
  type Restaurant = QRSE.Restaurant
  type Dish = QRSE.Dish
  type Order = QRSE.Order
  type OrderItem = QRSE.OrderItem
  type Desk = QRSE.Desk
}
