import { errorResponder, invalidPathHandler } from './middleware/errorReponder';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import { port } from './lib/contants';
import * as MySQLConnector from './lib/db';
import { ApiRoutes, route } from './shared/enums/apiRoutes';
import authRoutes from './routes/auth.routes';
import './lib/db';

const app: Express = express();

dotenv.config();

MySQLConnector.intiDatabase();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(route(ApiRoutes.AUTH), authRoutes);

// Middleware
app.use(errorResponder);
app.use(invalidPathHandler);

try {
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Server is running on port: ${port}`));
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(err);
}
