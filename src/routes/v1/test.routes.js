import express from "express";
import noFileUploadMiddleware from "../../middlewares/upload.middleware.js";

const testRouter = express.Router({ mergeParams: true });

testRouter
.route('/dot')
	.post( async (req, res, next) => {
		try {
			const body = req.body;
			console.log(body)
			console.log(body['defect.name'])
			return res.status(200).json({...req.query, ...req.params, ...req.body});
		} catch (e) {
			console.log(e)
			next(e)
		}
	})
.patch(async (req, res, next) => {
	try {
		return res.status(200).json({...req.body});
	}catch (e) {
		next(e);
	}
});

testRouter
.route('/formDot')
.patch(noFileUploadMiddleware, async (req, res, next) => {
	try {
		console.log(req.body);
		console.log(req.body['coordinate.x'])
		return res.status(200).json({...req.query, ...req.params, ...req.body})
	}catch (e) {
		next(e);
	}
});

testRouter
.route('/pathDot/:resident.uniqueId')
.get(async (req, res, next) => {
	try {
		return res.status(200).json({...req.query, ...req.params, ...req.body})
	}catch (e) {
		next(e)
	}
});

export default testRouter;