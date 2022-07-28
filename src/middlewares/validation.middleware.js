import { signupSchema } from '../utils/schemas.joi.js';

export const validateSignupBody = async (req, res, next) => {
  try {
    // 유효성 검증 실패 시 catch로 이동
    await signupSchema.validateAsync(req.body);
    next();
  } catch (e) {
    console.log(e);
    return res.status(499).json('not ok');
  }
};
