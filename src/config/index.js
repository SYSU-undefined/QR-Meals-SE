import dev from './dev';
import prod from './prod';
import test from './test';

const { NODE_ENV = 'dev' } = process.env;
Object.assign(process.env, { NODE_ENV });

const config = getConfig();

export default config;
export const appKeys = config.appKeys;
export const port = config.port;
export const db = config.db;
export const salt = config.salt;
export const sessionKey = config.sessionKey;
export const appid = config.appid;
export const appsecret = config.appsecret;

function getConfig() {
  // Default NODE_ENV='dev'
  const map = { [NODE_ENV]: dev, dev, prod, test };
  return map[NODE_ENV];
}
