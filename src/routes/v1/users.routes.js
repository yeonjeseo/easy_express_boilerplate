import express from 'express';
import { readAllUsers, createUser } from '../../controllers/users.controller.js';
const usersRouter = express.Router();

usersRouter.route('/').get(readAllUsers).post(createUser);

export default usersRouter;
