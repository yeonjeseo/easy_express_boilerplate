import express from 'express';
import { readAllUsers, postUser } from '../../controllers/users.controller.js';
const usersRouter = express.Router();

usersRouter.route('/').get(readAllUsers).post(postUser);

export default usersRouter;
