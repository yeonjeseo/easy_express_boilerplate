import express from 'express';
import { localAuthentication, refreshToken, logout } from '../../controllers/authentication.controller.js';
import { validateLoginBody } from '../../middlewares/validation.middleware.js';
import catchAsync from "../../utils/catchAsync.js";

const authRouter = express.Router();

authRouter.route('/local').post(validateLoginBody, catchAsync(localAuthentication));
authRouter.route('/refresh').post(catchAsync(refreshToken));
authRouter.route('/logout').post(catchAsync(logout));

export default authRouter;