import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/general.config.js';
import v1Router from './routes/v1/index.js';

const PORT = config.PORT;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', v1Router);

app.listen(PORT, () => console.log(`Express WAS is listening to port ${PORT}!! 👂`));
