import passport from 'passport';
import LocalStrategy from 'passport-local';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { findUserByAccount, findUserByPk } from '../queries/users.queries.js';
import config from './general.config.js';

const jwtSecret = config.JWT_SECRET;

const jwtOptions = {
  // header.authorization의 Bearer 타입 토큰을 자동으로 가져오도록 도와줌
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // jwt secret
  secretOrKey: jwtSecret,
};

/**
 * AUTHORIZATION - 인가, 권한
 * jwt 전략은 jwt token 유효성 검사, decode까지 알아서 해줌
 */
export const jwtStrategy = () =>
  passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        /**
         * Your logic here
         */
        const { userId } = payload;
        const user = await findUserByPk(userId);

        if (!user) {
          console.log('사용자 없음');
          return done(null, false, { message: 'user not exist' });
        }

        return done(null, user);
      } catch (e) {
        console.error(e);
        done(e);
      }
    })
  );

/**
 * AUTHENTICATION - 인증, 패스워드 인증 ,생제 인증 등
 */
export const localStrategy = () =>
  passport.use(
    'local',
    new LocalStrategy({ usernameField: 'account', passwordField: 'password' }, async (account, password, done) => {
      try {
        /**
         * Your logic here
         */
        const user = await findUserByAccount(account);
        if (!user) {
          console.log('사용자 없음');
          return done(null, false, { message: '존재하는 회원이 없습니다.' });
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
          return done(null, true, { message: '비밀번호가 일치하지 않습니다.' });
        }
        /**
         * done 호출 시, 인자를 3개 보내는데,
         * 첫번째 에러를 보낼 시, 두번째 인자로 User를 보내도 authenticate에서 받지 못함
         */
        return done(null, user);
      } catch (e) {
        console.error(e);
        done(e);
      }
    })
  );
