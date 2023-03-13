import {errorLogger} from "./customLogger.js";
import {isAxiosError} from "axios";

const errorHandler = (error, req, res, next) => {
  if(error instanceof isAxiosError)
    return  res.status(error.status).json(error);
  errorLogger(error, req, "errorHandler");
  return res.status(400).send(error.message);
};

export default errorHandler;