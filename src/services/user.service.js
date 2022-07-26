/**
 * MySQL entrypoint 모듈을 가져와서 서비스 로직을 구현
 * 모든 서비스 로직은 트랜잭션으로 처리 (all or nothing)
 */

import db from '../models/mysql/index.js';
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

export const createUser = async (account, name) => {
  const t = await db.sequelize.transaction();
  try {
    await insertUser(account, name, t);
    await t.commit();
    return;
  } catch (e) {
    console.log(e);
    await t.rollback();
    return Error(e);
  }
};
