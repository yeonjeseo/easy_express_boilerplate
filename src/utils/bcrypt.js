import bcrypt from 'bcrypt';
import config from '../config/general.config.js';

const SALT_ROUND = Number(config.SALT_ROUND);

export const plainToHash = (plain) => bcrypt.hash(plain, SALT_ROUND);
