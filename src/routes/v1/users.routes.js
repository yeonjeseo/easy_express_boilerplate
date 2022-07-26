import express from 'express';
import { postUser, getUser } from '../../controllers/users.controller.js';
import { logInOnly } from '../../middlewares/authorization.middleware.js';
import { validateSignupBody } from '../../middlewares/validation.middleware.js';

const usersRouter = express.Router();

usersRouter.route('/').post(validateSignupBody, postUser);
usersRouter.route('/:userId').get(logInOnly, getUser);

export default usersRouter;
