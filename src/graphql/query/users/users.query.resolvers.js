import { findAllUsers } from '../../../repositories/users.repository.js';

export const getAllUsers = async () => {
  try {
    const users = await findAllUsers();
    const result = [];
    users.forEach((user) => result.push(user.dataValues));
    return result;
  } catch (e) {
    console.log(e);
    return Error(e);
  }
};