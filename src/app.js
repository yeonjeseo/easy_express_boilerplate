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

const PORT = config.PORT;
const app = express();

localStrategy();
jwtStrategy();
graphqlLocalStrategy();

app.use(passport.initialize());

// app.use(helmet());
app.use(hpp());
app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }));
app.use('*', cors());
app.use(express.json());
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
