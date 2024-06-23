import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { AuthRouter } from './app/modules/auth/auth.router';
import { FacilityRouter } from './app/modules/facility/facility.router';
import { bookingRouter } from './app/modules/booking/booking.router';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/auth', AuthRouter);
app.use('/api/facility', FacilityRouter);
app.use('/api', bookingRouter);

const getAController = (req: Request, res: Response) => {
  res.send('Server is Running');
};

app.get('/', getAController);

export default app;
