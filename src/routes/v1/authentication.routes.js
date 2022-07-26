import express from 'express';
import { localAuthentication } from '../../controllers/authentication.controller.js';

const authRouter = express.Router();

authRouter.route('/local').post(localAuthentication);

export default authRouter;
