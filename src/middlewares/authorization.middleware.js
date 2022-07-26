import passport from 'passport';

export const logInOnly = async (req, res, next) => {
  try {
    passport.authorize('jwt', { session: false }, (error, user, info) => {
      /**
       * Your logic here
       */
      if (error) throw error;
      if (!user) return res.status(401).json('Not Authorized!');
      req.user = user.dataValues;
      next();
    })(req, res);
  } catch (error) {
    return res.status(400).json('error');
  }
};
