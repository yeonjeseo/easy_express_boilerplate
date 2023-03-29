import express from 'express';
import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';
import hpp from 'hpp';
import config from './config/general.config.js';
import entrypoint from './routes/index.js';
import { localStrategy, jwtStrategy, graphqlLocalStrategy } from './config/passport.config.js';
import errorHandler from './utils/errorHandler.js';
import { graphqlHTTP } from 'express-graphql';
import { graphQLSchema } from './graphql/index.js';
import { buildContext } from 'graphql-passport';
import {createNaverSignature} from "./utils/bcrypt.js";
import axios from "axios";

const PORT = config.PORT;
const app = express();

localStrategy();
jwtStrategy();
graphqlLocalStrategy();

app.use(passport.initialize());

if(config.NODE_ENV === 'production') app.use(helmet());
app.use(hpp());

/**
 * helmet contentSEcurityPolicy를 활성화하면 graphQLHTTP 접속이 안되는 문제가 있음
 */
app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }));
app.use('*', cors());
// JSON parser
app.use(express.json());
// FormData parser
app.use(express.urlencoded({ extended: true }));

app.use('/api', entrypoint);
app.use(
  '/graphql',
  graphqlHTTP((req, res) => ({
    schema: graphQLSchema,
    graphiql: true,
    context: buildContext({ req, res }),
  }))
);

// 에러 핸들러
app.use(errorHandler);

app.listen(PORT, () => console.log(`Express WAS is listening to port ${PORT}!! 👂`));
