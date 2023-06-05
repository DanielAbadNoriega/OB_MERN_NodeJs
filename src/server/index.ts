import express, { Express, Request, Response } from 'express';
// import { generateKata } from '../domain/entities/Katas.entity';

//Swagger
import swaggerUi from 'swagger-ui-express';

// Security
import cors from 'cors';
import helmet from 'helmet';

// TODO HTTPS

// Root Router
// * Here we are using /routes/index.ts (it is implicit when it has an "index" file)
import rootRouter from '../routes';
import mongoose from 'mongoose';

// * Create Express App
const server: Express = express();

// * Swagger Config and route
server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
      explorer: true,
    },
  })
);

// * Define SERVER to use "/api" and use rootRouter from "index.ts" in routes
// From this point onover: http://localhost:8000/api/...
server.use('/api', rootRouter);

// Static server
server.use(express.static('public'));

// TODO Mongoose Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/OB_MERN')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    // generateKata();
  })
  .catch((err) => console.error('Error connecting to mongo', err));
// * Security Config
server.use(helmet());
server.use(cors());

// * Content Type Config
// With this, we can use req.body
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));

// * Redirections Config
// http://localhost:8000/ --> http://localhost:8000/api/
server.get('/', (req: Request, res: Response) => {
  res.redirect('/api');
});

export default server;
