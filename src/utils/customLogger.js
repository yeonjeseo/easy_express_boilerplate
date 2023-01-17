import logger from "../config/winston.logger.js";
export const errorLogger = (error, req, message) => {
	return logger.error(`\n[API Info] ${req.method} ${req.originalUrl} ${message} \n[Error stack]${error.stack}\n[req.body] : ${JSON.stringify(req.body)}\n[req.query] : ${JSON.stringify(req.query)}\n[req.params] : ${JSON.stringify(req.params)}`);
}

/**
 * create a function which calculates byte length of a string
 */