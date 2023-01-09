import multer from 'multer';

const noFileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => callback(null, `${process.cwd()}/uploads`),
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  }),
});

const noFileUploadSingle =  noFileUpload.single('image')

const noFileUploadMiddleware = async (req, res, next) => noFileUploadSingle(req, res, error => {
  try {
    if (error) throw error;
    return next();
  } catch (e) {
    next(e)
  }
})

export default noFileUploadMiddleware;