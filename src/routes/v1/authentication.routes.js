import express from 'express';
const authRouter = express.Router();

authRouter.route('/local').post(async (req, res) => {
  console.log(req.body);
  return res.status(200).json();
});

export default authRouter;
