import passport from 'passport';
import LocalStrategy from 'passport-local';
import config from './general.config.js';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { findUserByAccount } from '../queries/users.queries.js';

export const localStrategy = () =>
  passport.use(
    'local',
    new LocalStrategy({ usernameField: 'account', passwordField: 'password' }, async (account, password, done) => {
      try {
        /**
         * user 유효성 검사 로직
         * 1. 조회
         * 2. 비밀번호
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

const jwtSecret = config.JWT_SECRET;

const jwtOptions = {
  // header.authorization의 Bearer 타입 토큰을 자동으로 가져오도록 도와줌
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // jwt secret
  secretOrKey: jwtSecret,
};

export const jwtStrategy = () =>
  passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        // user 검증
        const user = await findUserByPk(id);
        console.log(user);
        if (!user) {
          console.log('사용자 없음');
          return done(null, false, { message: '존재하는 회원이 없습니다.' });
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
          console.log(isMatched);
          return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
        return done(null, user);
      } catch (e) {
        console.error(e);
        done(e);
      }
    })
  );
