import express from 'express';
import { checkAvailability, createBooking, deleteBooking, getAllBookings, getUserBookings } from './booking.controller';
import verifyJWT from '../../middlewares/auth';
const router = express.Router();


router.get('/check-availability', checkAvailability);
router.post('/bookings', verifyJWT, createBooking);
router.get('/bookings', verifyJWT, getAllBookings);
router.get('/bookings/user', verifyJWT, getUserBookings);
router.delete('/bookings/:id', verifyJWT, deleteBooking);

export const bookingRouter = router;
