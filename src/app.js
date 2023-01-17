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

app.post('/test/:userId' , async (req, res, next) => {
  try {
    console.log(req.params)
    console.log(req.query)
    throw Error('에러가 발생했다고 가정. 이때 req.body, req.params, req.query 등의 정보를 확인해야 한다면 어떻게 해야할까?');
    
  }catch (e) {
    next(e)
  }
})

// 에러 핸들러
app.use(errorHandler);

app.listen(PORT, () => console.log(`Express WAS is listening to port ${PORT}!! 👂`));