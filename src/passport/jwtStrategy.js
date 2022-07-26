import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from '../config/general.config.js';

const jwtSecret = config.JWT_SECRET;

const jwtOptions = {
  // header.authorization의 Bearer 타입 토큰을 자동으로 가져오도록 도와줌
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // jwt secret
  secretOrKey: jwtSecret,
};

const jwtStrategy = () =>
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

export default jwtStrategy;
