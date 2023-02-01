const logger = require('../config/logger');

const errorLogger = (error, req) =>
  logger.error(`
 [merchantId : ${req.params.merchantId || req.body.merchantId || req.account?.merchantId || ''}]
 [API method : ${req.method}]
 [API url : ${req.originalUrl}]${(() =>
    Object.keys(req.params).length > 0 ? `\n [API params : ${JSON.stringify(req.params)}]` : '\b')()}${(() =>
    Object.keys(req.query).length > 0 ? `\n [API query : ${JSON.stringify(req.query)}]` : '\b')()}${(() =>
    Object.keys(req.body).length > 0 ? `\n [API body : ${JSON.stringify(req.body)}]` : '')()}
 [Error message : ${error.message}]
 [${error.stack}]`);

const infoLogger = (req, message) =>
  logger.info(`
 [merchantId : ${req.params.merchantId || req.body.merchantId || req.account?.merchantId || ''}]
 [API method : ${req.method}]
 [API url : ${req.originalUrl}]${(() =>
    Object.keys(req.params).length > 0 ? `\n [API params : ${JSON.stringify(req.params)}]` : '\b')()}${(() =>
    Object.keys(req.query).length > 0 ? `\n [API query : ${JSON.stringify(req.query)}]` : '\b')()}${(() =>
    Object.keys(req.body).length > 0 ? `\n [API body : ${JSON.stringify(req.body)}]` : '')()}
 [API message : ${message}]`);

const generalLogger = (message) => logger.info(message);

module.exports = {
  errorLogger,
  infoLogger,
  generalLogger,
};
