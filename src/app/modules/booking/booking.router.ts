import express from 'express';
import { checkAvailability } from './booking.controller';
const router = express.Router();


router.get('/', checkAvailability);


export const bookingRouter = router;
