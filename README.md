# Easy REST API Server boilerplate

---

## 개요

내 입맛대로 만들어보는 REST API boilerplate

## 폴더 구조

+-- node_modules
+-- package.json
+-- readme.md
+-- src
| +-- config
| +-- controllers
| +-- middlewares
| +-- models
| +-- queries
| +-- routes
| +-- services
| +-- utils
| +-- app.js
| +-- index.js

## 세션 관리 - 토큰 기반

jwt, passport

### 인증(authentication)

passport-local 사용
access, refresh 토큰 발급

### 인가(authorization)

passport-jwt 사용
