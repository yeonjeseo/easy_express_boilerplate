// const { createClient } = require('redis');
import { createClient } from 'redis';

// const HOST_URL = 'redis_container';

// const redisClient = createClient({
//   url: `redis://${HOST_URL}:6379`,
// });

const redisClient = createClient();

redisClient.on('error', (err) => console.log(`Redis Client Error!\n${err}`));
redisClient.on('connect', () => console.log('Redis Connected'));
redisClient.connect();

export const setValue = (userId, refreshToken) => redisClient.set(String(userId), refreshToken, { EX: 60 * 60 });
export const getValue = (userId) => redisClient.get(String(userId));
export const deleteValue = (key) => redisClient.del(String(key));
