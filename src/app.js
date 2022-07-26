import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/general.config.js';

const PORT = config.PORT;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Express WAS is listening to port ${PORT}!! 👂`));
