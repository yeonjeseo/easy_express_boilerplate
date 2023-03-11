import passport from 'passport';
import {
  checkIfValueExist,
  decodeToken,
  deleteRefreshAndVerify,
  issueJwt,
  publishToken,
  validateJwt,
} from '../services/authenticate.service.js';

export const localAuthentication = async (req, res, next) => {
  try {
    passport.authenticate('local', { session: false }, async (error, user, info) => {
      /**
       * Your logic here
       */
      if (error) throw error;
      if (user === false) return res.status(404).json('Not found!');
      if (user === true) return res.status(401).json('Not Authorized');

      const tokens = await publishToken(user);
      if (tokens instanceof Error) return next(tokens);
      return res.status(200).json(tokens);
    })(req, res);
  } catch (e) {
    return next(e, req, res);
  }
};

/**
 * 토큰이 만료되었을 경우 클라이언트에서 재발급 요청
 * 이번엔 body에 토큰을 담아서 보내줌
 */
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const isValid = validateJwt(refreshToken);
    const decodedToken = decodeToken(refreshToken);
    // if (isValid instanceof Error) return res.status(401).json('Unauthorized');
    const { userId } = decodedToken;
    const storedRefreshToken = await checkIfValueExist(userId);

    if (isValid instanceof Error || !storedRefreshToken) return res.status(401).json('Unauthorized');

    // 1. Refresh Token 유효성 체크
    // 2. 저장소에 Refresh Token 존재유무 체크
    // 1, 2 모두 검증되면 재발급 진행
    // Response header에 새로 발급한 Access Token 저장
    const accessToken = issueJwt(userId);

    return res.status(200).json(accessToken);
  } catch (e) {
    return next(e, req, res);
  }
};

export const logout = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const isSuccess = await deleteRefreshAndVerify(accessToken);

    if (!isSuccess) throw '로그아웃 실패';

    return res.status(200).json('ok');
  } catch (e) {
    next(e, req, res);
  }
};