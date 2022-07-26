import express from 'express';
import v1Router from './v1/index.js';

const entrypoint = express.Router();

entrypoint.use('/v1', v1Router);
entrypoint.get('/healthCheck', (_, res) => res.status(200).json('Healthy!'));

export default entrypoint;
