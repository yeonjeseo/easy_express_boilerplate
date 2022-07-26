const errorHandler = (error, req, res, next) => {
  console.log('\x1b[33m%s\x1b[0m', error);
  return res.status(400).send(error.message);
};

export default errorHandler;
