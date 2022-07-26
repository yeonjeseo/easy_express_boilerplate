/**
 * MySQL entrypoint 모듈을 가져와서 서비스 로직을 구현
 * 모든 서비스 로직은 트랜잭션으로 처리 (all or nothing)
 */

import db from '../models/mysql/index.js';
import bcrypt from 'bcrypt';
import config from '../config/general.config.js';
import { insertUser, selectUserByAccount } from '../queries/users.queries.js';

export const checkIfUserExist = async (account) => {
  const t = await db.sequelize.transaction();
  try {
    const user = await selectUserByAccount(account, t);
    await t.commit();
    return user;
  } catch (e) {
    await t.rollback();
    return Error(e);
  }
};

export const createUser = async (account, name, password) => {
  const t = await db.sequelize.transaction();
  try {
    const hashed = await bcrypt.hash(password, Number(config.SALT_ROUND));
    await insertUser(account, name, hashed, t);
    await t.commit();
    return;
  } catch (e) {
    // console.log(e);
    await t.rollback();
    return Error(e);
  }
};
