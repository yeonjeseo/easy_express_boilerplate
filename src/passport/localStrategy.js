import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';

const localStrategy = () =>
  passport.use(
    new LocalStrategy({ usernameField: 'account', passwordField: 'password' }, async (account, password, done) => {
      console.log(account, password);
      try {
        // user 검증
        // const user = await User.findOne()...
        if (!user) return done(null, false, { message: '존재하는 회원이 없습니다.' });
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        return done(null, user);
      } catch (e) {
        console.error(e);
        done(e);
      }
    })
  );

export default localStrategy;
