import { insertUser } from '../../../queries/users.queries.js';
import { plainToHash } from '../../../utils/bcrypt.js';

export const createUser = async (account, name, password) => {
  try {
    const hashed = await plainToHash(password);
    const user = await insertUser(account, name, hashed);
    return `${user.id}`;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const login = async (root, args, context) => {
  try {
  } catch (e) {
    console.log(e);
    return e;
  }
};
