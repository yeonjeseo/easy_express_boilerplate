import multer from 'multer';

// const noFileUpload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, callback) => callback(null, `${process.cwd()}/uploads`),
//     filename: (req, file, callback) => {
//       callback(null, file.originalname);
//     },
//   }),
// });

const noFile = multer();

const noFileUpload =  noFile.none();

const noFileUploadMiddleware = async (req, res, next) => noFileUpload(req, res, error => {
  try {
    if (error) throw error;
    req.body = JSON.parse(JSON.stringify(req.body))
    return next();
  } catch (e) {
    next(e)
  }
})

export default noFileUploadMiddleware;
