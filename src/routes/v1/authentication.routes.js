import express from 'express';
import { localAuthentication, refreshToken, logout } from '../../controllers/authentication.controller.js';
import { validateLoginBody } from '../../middlewares/validation.middleware.js';

const authRouter = express.Router();

authRouter.route('/local').post(validateLoginBody, localAuthentication);
authRouter.route('/refresh').post(refreshToken);
authRouter.route('/logout').post(logout);
export default authRouter;
