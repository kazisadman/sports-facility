import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { AuthRouter } from './app/modules/auth/auth.router';
import { FacilityRouter } from './app/modules/facility/facility.router';
import { bookingRouter } from './app/modules/booking/booking.router';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const getAController = (req: Request, res: Response) => {
  res.send('Server is Running');
};

app.get('/', getAController);

// application routes
app.use('/api/auth', AuthRouter);
app.use('/api/facility', FacilityRouter);
app.use('/api', bookingRouter);

// Global "Not Found" handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Not Found',
  });
});

export default app;
