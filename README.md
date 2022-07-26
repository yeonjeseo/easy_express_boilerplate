# Easy REST API Server boilerplate

---

## 1. 개요

내 입맛대로 만들어보는 REST API boilerplate

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

sequelize

### 테이블 생성

`sequelize.sync({alter: true})` 옵션 적용하여 코드 단에서 생성된 모델에 맞춰 테이블 생성

### DB 트랜잭션

query에서는 ORM 트랜잭션 옵션을 받아 사용할 수 있도록 정의

비즈니스 로직이 정의되어 있는 모듈 (service)에서는 하나의 비즈니스 로직에 하나의 트랜잭션 객체를 할당해 commit or rollback 하도록 구현

## 6. 에러 핸들링

### API 미들웨어

미들웨어에서 바로 4XX 응답 반환

### API endpoint

next 함수 호출하여 하나의 에러핸들러에서 응답 반환하도록 구현

`app.js` 참고

```jsx
// 에러 핸들러
app.use(errorHandler);
```

## 7. 환경변수

`confing/general.config.js`에서만 `process.env` 참조

Node 환경 (NODE_ENV) 은 npm script에서 지정하도록 설정 (package.json 참고)
