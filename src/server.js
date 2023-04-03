import express, { json } from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import handleApplicationErrors from './middlewares/errors.middleware.js';

const app = express();
app.use(json());
app.use(cors());
app.use(routes);
app.use(handleApplicationErrors);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`port ${port}`));