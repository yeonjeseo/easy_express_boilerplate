import { checkIfUserExist, createUser } from '../services/user.service.js';

export const readAllUsers = async (req, res) => {
  try {
    console.log('회원 전체 조회');
    const user = await checkIfUserExist('yeonjeseo');

    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(400).json('not ok');
  }
};

export const postUser = async (req, res) => {
  try {
    const { account, name } = req.body;
    const user = await checkIfUserExist(account);
    console.log(user);
    if (user.length !== 0) return res.status(409).json('Already Exist');

    await createUser(account, name);

    return res.status(200).json('ok');
  } catch (e) {
    console.log(e);
    return res.status(400).json('not ok');
  }
};
