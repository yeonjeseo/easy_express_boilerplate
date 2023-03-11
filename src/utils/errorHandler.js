import {errorLogger} from "./customLogger.js";

const errorHandler = (error, req, res, next) => {
  errorLogger(error, req, "errorHandler");
  return res.status(400).send(error.message);
};

export default errorHandler;