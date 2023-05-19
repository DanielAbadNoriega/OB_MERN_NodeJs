import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

// Configuration
dotenv.config();

// Express APP
const app: Express = express();
const port: string | number = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from index.ts probando');
});

app.listen(port, () => {
  console.log(
    `[ NodeJs - Listening ] Listening from index.ts at http://localhost:${port}`
  );
});
