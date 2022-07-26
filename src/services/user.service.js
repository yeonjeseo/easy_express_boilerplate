import db from '../models/mysql/index.js';

export const checkIfUserExist = async (account) => {
  const t = await db.sequelize.transaction();
  try {
    const user = await db.sequelize.query(`SELECT * FROM Users WHERE account='${account}'`, {
      type: db.QueryTypes.SELECT,
      raw: true,
      transaction: t,
    });

    await t.commit();
    return user;

    // console.log(user);
  } catch (e) {
    await t.rollback();
    return Error(e);
  }
};

export const createUser = async (account, name) => {
  const t = await db.sequelize.transaction();
  try {
    await db.sequelize.query(`INSERT INTO Users(account, name) VALUES('${account}', '${name}')`, {
      type: db.QueryTypes.INSERT,
      raw: true,
      transaction: t,
    });
    await t.commit();
    return;
  } catch (e) {
    console.log(e);
    await t.rollback();
    return Error(e);
  }
};
