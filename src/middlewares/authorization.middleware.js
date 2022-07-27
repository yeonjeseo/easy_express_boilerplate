import passport from 'passport';

export const logInOnly = async (req, res, next) => {
  try {
    passport.authorize('jwt', { session: false }, (error, user, info) => {
      /**
       * Your logic here
       */
      if (error) throw error;
      if (info) {
        if (info.message === 'jwt expired') return res.status(401).json('토큰 만료');

        if (info.message === 'No auth token') return res.status(401).json('토큰 없음');

        if (info.message === 'user not exist') return res.status(404).json('User Not Found!');
      }
      req.user = user.dataValues;
      next();
    })(req, res);
  } catch (error) {
    return res.status(400).json('error');
  }
};
