import express from 'express';
import { postUser, getUser } from '../../controllers/users.controller.js';
import { logInOnly } from '../../middlewares/authorization.middleware.js';
import { validateSignupBody } from '../../middlewares/validation.middleware.js';
import catchAsync from "../../utils/catchAsync.js";

const usersRouter = express.Router();

usersRouter.route('/').post(validateSignupBody, catchAsync(postUser));
usersRouter.route('/:userId').get(logInOnly, catchAsync(getUser));

export default usersRouter;