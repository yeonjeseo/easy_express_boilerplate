// import passport from 'passport';
// import { findUserByPk } from '../queries/users.queries.js';
// import local from './localStrategy.js';
// import jwt from './jwtStrategy.js';

// const passportConfig = () => {
//   /**
//    * serializeUser
//    * - strategy에서 로그인 성공 시 호출하는 done(null, user)의 두 번째 인자를 전달 받아 req.session.passport.user에 저장
//    * - 보통 세션 무게를 줄이기 위해, User의 Id만 세션에 저장
//    */
//   passport.serializeUser((user, done) => done(null, user.id));

//   /**
//    * deserializeUser
//    * - 서버로 들어오는 요청마다 세션 정보를 실데 데이터베이스와 비교
//    * - 해당 유저 정보가 있으면 done을 실행하여 req.user에 user 정보 저장
//    * - serializeUser에서 done의 두번째 매개변수 (user.id)가 deserializeUser의 첫번째 매개변수
//    */
//   passport.deserializeUser(async (id, done) => {
//     try {
//       console.log(id);
//       const user = await findUserByPk(id);
//       return done(null, user);
//     } catch (e) {
//       console.log(e);
//       return done(err);
//     }
//   });

//   local();
//   jwt();
// };

// export default passportConfig;
