import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { AuthRouter } from './app/modules/auth/auth.router';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/auth', AuthRouter);

const getAController = (req: Request, res: Response) => {
  res.send('Server is Running');
};

app.get('/', getAController);

export default app;
