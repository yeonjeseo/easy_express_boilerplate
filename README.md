# Easy REST API Server boilerplate

---

## 1. 개요

REST API boilerplate using Node.js, express

## 2. 폴더 구조

```
├── node_modules
├── package.json
├── readme.md
├── src
│    ├── config
│    ├── controllers
│    ├── middlewares
│    ├── models
│    ├── queries
│    ├── routes
│    ├── services
│    ├── utils
│    ├── app.js
│    └── index.js
└── test
```

## 3. 세션 관리 - 토큰 기반

jwt, passport

### 인증(authentication), 로그인

passport-local 사용
access, refresh 토큰 발급

### 인가(authorization), 권한 확인

passport-jwt 사용

## 4. 입력값 검증

joi, middleware 활용

## 5. 데이터베이스 - MySQL

ORM - sequelize

### 테이블 생성

`sequelize.sync({alter: true})` 옵션 적용하여 코드 단에서 생성된 모델에 맞춰 테이블 생성

### DB 트랜잭션

`queries` 폴더 내 모듈에는 단일 DML을 정의하고, 필요에 따라 트랜잭션으로 묶어 사용할 수 있도록 정의

비즈니스 로직이 정의되어 있는 모듈 (`service` 폴더 내부)에서는 하나의 비즈니스 로직에 하나의 트랜잭션 객체를 할당해 commit or rollback 하도록

### 관계 정의

`models/mysql/index.js` 내부에 정의

## 6. 에러 핸들링

### API 미들웨어

미들웨어에서 바로 4XX 응답 반환

### API endpoint

next 함수 호출하여 하나의 에러 핸들러에서 응답 반환하도록 구현

`app.js` 에서 에러 핸들러 설정

```jsx
// app.js
app.use(errorHandler);


//req에 로거 메세지 실어 보내기
// API contronller
export const postUser = async (req, res, next) => {
  try {
    ...
    ...
  } catch (e) {
    return next(e, res);
  }

// error handler
const errorHandler = (error, req, res, next) => {
  console.log('\x1b[33m%s\x1b[0m', error);
  return res.status(400).send(error.message);
};
```

## 7. 환경변수

`confing/general.config.js`에서만 `process.env` 참조

Node 환경 (NODE_ENV) 은 npm script에서 지정하도록 설정 (package.json 참고)

NODE_ENV에 따라 host 설정 값이 자동으로 바뀌도록 하여, human error 줄이기 위함

```jsx
// config/general.config.js
const config = {
  NODE_ENV: envVars.NODE_ENV,
  sequelize: {
    local: {
      username: envVars.LOCAL_DB_USERNAME,
      password: envVars.LOCAL_DB_PASSWORD,
      database: envVars.LOCAL_DB_DATABASE,
      host: envVars.LOCAL_DB_HOST,
      dialect: 'mysql',
      logging: false,
      timezone: '+09:00',
    },
    development: {
      username: envVars.DEV_DB_USERNAME,
      password: envVars.DEV_DB_PASSWORD,
      database: envVars.DEV_DB_DATABASE,
      host: envVars.DEV_DB_HOST,
      dialect: 'mysql',
      logging: false,
      timezone: '+09:00',
    },
    production: {
      username: envVars.PROD_DB_USERNAME,
      password: envVars.PROD_DB_PASSWORD,
      database: envVars.PROD_DB_DATABASE,
      host: envVars.PROD_DB_HOST,
      dialect: 'mysql',
      logging: false,
      timezone: '+09:00',
    },
  },
};

// models/mysql/index.js
import config from '../../config/general.config.js';
const env = config.NODE_ENV;
const sequelizeConfig = config.sequelize[env];
const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  sequelizeConfig
);
```

## 8. GraphQL

REST API에 대응하는 query, mutation 구현 buildSchema, GraphQLSchema 중 GraphQLSchema로 schema 구현

## 9. In-memory storage 사용

JWT 토큰 저장소로 redis 채택
