import { createClient } from 'redis';
import { redis } from '../../config';
import { promisifyAll } from '../../utils';

const options = {
  ...redis
};

const client = createClient(options);

promisifyAll(client.get).bind(client);

export const redisClient = client;
