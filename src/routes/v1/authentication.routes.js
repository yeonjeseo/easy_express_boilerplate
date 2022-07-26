import express from 'express';
import passport from 'passport';
const authRouter = express.Router();

authRouter.route('/local').post(async (req, res) => {
  try {
    passport.authenticate('local', { session: false }, (passportError, user, info) => {
      console.log();
      return res.status(200).json('ok');
    })(req, res);
  } catch (e) {
    console.log(e);
    return res.status(400).json();
  }
});

export default authRouter;
