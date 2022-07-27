import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/general.config.js';

const JWT_SECRET = config.JWT_SECRET;

export const localAuthentication = async (req, res, next) => {
  try {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      /**
       * Your logic here
       */
      console.log(info instanceof Error);
      if (error) throw error;
      if (user === false) return res.status(404).json('Not found!');
      if (user === true) return res.status(401).json('Not Authorized');

      // JWT 발급
      const payload = { userId: user.id };
      const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '30' });
      const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '3000' });

      return res.status(200).json({ accessToken });
    })(req, res);
  } catch (e) {
    return next(e, res);
  }
};
