import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/general.config.js';
import entrypoint from './routes/index.js';
// import passportConfig from './passport/index.js';
import { localStrategy } from './config/passport.config.js';
import passport from 'passport';

const PORT = config.PORT;
const app = express();

/**
 * cookieParser : 요청의 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어
 */
// app.use(cookieParser());
// passportConfig();

app.use(passport.initialize());
localStrategy();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', entrypoint);

app.listen(PORT, () => console.log(`Express WAS is listening to port ${PORT}!! 👂`));
