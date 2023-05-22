import express, { Express, Request, Response } from 'express';

// Security
import cors from 'cors';
import helmet from 'helmet';

// TODO HTTPS

// Root Router
// * Here we are using /routes/index.ts (it is implicit when it has an "index" file)
import rootRouter from '../routes';

// * Create Express App
const server: Express = express();

// * Define SERVER to use "/api" and use rootRouter from "index.ts" in routes
// From this point onover: http://localhost:8000/api/...
server.use('/api', rootRouter);

// Static server
server.use(express.static('public'));

// TODO Mongoose Connection

// * Security Config
server.use(helmet());
server.use(cors());

// * Content Type Config
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));

// * Redirections Config
// http://localhost:8000/ --> http://localhost:8000/api/
server.get('/', (req: Request, res: Response) => {
  res.redirect('/api');
});

export default server;
