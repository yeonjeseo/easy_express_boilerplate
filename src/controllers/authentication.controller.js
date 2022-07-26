import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/general.config.js';

const JWT_SECRET = config.JWT_SECRET;

export const localAuthentication = async (req, res) => {
  try {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error) throw error;
      if (user === false) return res.status(404).json('Not found!');
      if (user === true) return res.status(401).json('Not Authorized');

      // JWT 발급
      const payload = { userId: user.id };
      const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
      const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1w' });

      return res.status(200).json({ accessToken });
    })(req, res);
  } catch (e) {
    console.log(e);
    return res.status(400).json();
  }
};
