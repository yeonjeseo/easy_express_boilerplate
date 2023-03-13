const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default catchAsync;
/**
 * @description try-catch 내에서 하위 비동기 모듈 에러가 발생할 경우 이는 catch로 빠지지 않는 문제 발생
 * 이를 막기 위해 함수를 Promise로 wrapping
 * 매개변수를 어떻게 넘기지?
 * 배열로 받고, 그대로 편하게 넘기기 위해 apply 메서드 활용
 * @param fn {function}
 * @param args {args}
 * @return Promise
 */

// export default catchAsync = (fn, ...args) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const result = await fn.apply({}, args);
//       if (result instanceof Error) throw result;
//       resolve(result);
//     } catch (e) {
//       reject(e);
//     }
//   });