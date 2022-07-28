import jwt from 'jsonwebtoken';
import config from '../config/general.config.js';
import { setValue, getValue, deleteValue } from '../utils/redis.js';

const JWT_SECRET = config.JWT_SECRET;

export const publishToken = async (user) => {
  try {
    const { id } = user;
    const payload = { userId: id };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '10s' });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    await setValue(id, refreshToken);

    return { accessToken, refreshToken };
  } catch (e) {
    console.log(e);
    return Error(e);
  }
};

export const validateJwt = (token) => {
  try {
    const result = jwt.verify(token, JWT_SECRET);
    return result;
  } catch (e) {
    console.log(e);
    return Error(e);
  }
};

export const decodeToken = (token) => jwt.decode(token);

export const checkIfValueExist = (key) => getValue(key);

export const issueJwt = (userId) => jwt.sign({ userId }, JWT_SECRET, { expiresIn: '10s' });

export const deleteRefreshAndVerify = async (accessToken) => {
  try {
    const { userId } = jwt.decode(accessToken);

    await deleteValue(userId);
    const isExist = await getValue(userId);
    return !isExist;
  } catch (e) {
    console.log(e);
    return Error(e);
  }
};
