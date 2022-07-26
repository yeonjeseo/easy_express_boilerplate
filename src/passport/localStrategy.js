import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { findUserByAccount, selectUserByAccount } from '../queries/users.queries.js';

const localStrategy = () =>
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

export default localStrategy;
