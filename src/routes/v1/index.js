/**
 * api 버전 변경에 유연하게 대응하기 위해
 * 버전별 라우터 구성
 */
import express from 'express';
import userRouter from './users.routes.js';
import authRouter from './authentication.routes.js';
import testRouter from './test.routes.js';

const v1Router = express.Router();

v1Router.use('/users', userRouter);
v1Router.use('/authenticate', authRouter);
v1Router.use('/test', testRouter);

export default v1Router;