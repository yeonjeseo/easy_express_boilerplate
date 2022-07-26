import express from 'express';
import { postUser, getUser } from '../../controllers/users.controller.js';
import { logInOnly } from '../../middlewares/authorization.middleware.js';
const usersRouter = express.Router();

usersRouter.route('/').post(postUser);
usersRouter.route('/:userId').get(logInOnly, getUser);

export default usersRouter;
