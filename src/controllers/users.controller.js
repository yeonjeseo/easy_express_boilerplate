/**
 * controller는 분기 단위로 비즈니스 로직을 나누고 해당 분기마다 다른 응답을 보여주는 역할
 * 회원 가입
 * - 중복 체크
 * - 회원 데이터 생성
 */

import { checkIfUserExist, createUser } from '../services/user.service.js';

export const readAllUsers = async (req, res) => {
  try {
    console.log('회원 전체 조회');
    // const user = await checkIfUserExist('yeonjeseo');
    return res.status(200).json();
  } catch (e) {
    return next(e, res);
  }
};

/**
 * @description 회원가입 api
 * @returns
 */
export const postUser = async (req, res, next) => {
  try {
    const { account, name, password } = req.body;
    const user = await checkIfUserExist(account);
    if (user.length !== 0) return res.status(409).json('Already Exist');
    const result = await createUser(account, name, password);
    if (result instanceof Error) throw result;
    return res.status(200).json('ok');
  } catch (e) {
    return next(e, res);
  }
};
